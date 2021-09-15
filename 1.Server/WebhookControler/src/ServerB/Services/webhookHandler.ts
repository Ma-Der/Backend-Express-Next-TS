import { WebhookAction } from '../Controllers/webhookControler';
import { IUserData } from '../../pseudoDB/pseudoDB';
import axios from 'axios';

export class WebhookHandler {
 public static async log(action: WebhookAction, data: IUserData | string | number, id?: string) {

    switch(action) {
        
        case 'addUser': 
            if(typeof data !== 'string') throw new Error('Data should be string.');

            const result = await axios.post("/addUser", {name: data})
            return result.data;
            

        case 'userLoggedIn':

            if(!id) throw new Error("You should pass user id.");
            if(!this.isIUserData(data)) throw new Error('Data should be IUserData.');

            const resultLoggedIn = await axios.post(`/userLoggedIn/${id}`, { data: data });
            return resultLoggedIn.data;
            
        case 'userLoggedOut':

            if(!id) throw new Error("You should pass user id.");
            if(!this.isIUserData(data)) throw new Error('Data should be IUserData.');
            
            const loggedOutUser = await axios.post(`/userLoggedOut/${id}`, {data});
            const deletedUser = await axios.delete(`/userLoggedIn/${id}`, {data});

            return loggedOutUser.data;
            
        case 'userBoughtProduct':
            
            if(!id) throw new Error("You should pass user id.");

            if(typeof data === 'string') {
                if(!isNaN(parseInt(data))) {
                    console.log(`In webhook handler: ${data}`)
                    const updateUserProductAmount = await axios.patch(`/userBoughtProduct/${id}`, {data});
                    console.log(updateUserProductAmount.data)
                    return updateUserProductAmount.data;
                }
            }
            
            const userThatBoughtProduct = await axios.post(`/userBoughtProduct/${id}`, {data});
            return userThatBoughtProduct.data;

        default:
            throw new Error("Wrong action.");
            
    }
 }

 private static isIUserData(object: any): object is IUserData {
     return true;
 }
}