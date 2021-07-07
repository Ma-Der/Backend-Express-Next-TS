import { WebhookAction } from '../Controllers/webhookControler';
import axios from 'axios';

export class WebhookHandler {
 public static log<T>(action: WebhookAction, data: T) {
    switch(action) {

        case 'addUser': 

            if(typeof data !== 'string') throw new Error('Data should be string.');

            axios.post("/addUser", {data})
                .then(result => {
                    return result.data;
                })
                .catch(err => { return err.message});

        case 'userLoggedIn':

            if(typeof data !== 'string') throw new Error('Data should be string.');

            axios.post("/userLoggedIn", {data})
                .then(result => {
                    return result.data;
                })
                .catch(err => { return err.message});
            
        case 'userLoggedOut':

            if(typeof data !== 'string') throw new Error('Data should be string.');

            axios.post("/userLoggedOut", {data})
                .then(result => {
                    return result.data;
                })
                .catch(err => { return err.message});

            axios.delete("/userLoggedIn", {data})
                .then(result => {
                  return result.data;
                })
                .catch(err => { return err.message});
            
        case 'userBoughtProduct':

            axios.post("/userBoughtProduct", {data})
                .then(result => {
                    return result.data;
                })
                .catch(err => { return err.message});

            axios.put("/userBoughtProduct", {data})
                .then(result => {
                    return result.data;
                })
                .catch(err => { return err.message});

        default:
            throw new Error("Wrong action.");
    }
 }
}