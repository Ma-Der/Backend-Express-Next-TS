
interface IUserModel {
    name: string;
    dateOfBirth: number;
    thingsItLikes: string[];
    friends: string[];
}

export class UserModel implements IUserModel {
    name: string;
    dateOfBirth: number;
    thingsItLikes: string[];
    friends: string[];

    constructor(name: string, dateOfBirth: string, thingsItLikes: string[], friends: string[]) {
        this.name = name;
        this.dateOfBirth = this.convertDateToNumber(dateOfBirth);
        this.thingsItLikes = thingsItLikes;
        this.friends = friends;
    }

    convertDateToNumber(date: string) {
        const correctStringDateFormat = this.isStringDateValid(date);
        if(!correctStringDateFormat) throw new Error("Wrong string date");
        
        const dateArray = date.split("-");
        
        const year = Number.parseInt(dateArray[2]);
        const month = Number.parseInt(dateArray[1])-1;
        const day = Number.parseInt(dateArray[0]);
        
        const correctDateFormat = new Date(year, month, day);
        
        return correctDateFormat.getTime();
    }

    isStringDateValid(dateString: string) {
        const dateArray = dateString.split("-");

        if(dateArray.length !== 3) return false;
        if(dateArray[0].length !== 2 || dateArray[1].length !== 2 || dateArray[2].length !== 4) return false;
        if(isNaN(Number.parseInt(dateArray[0])) || isNaN(Number.parseInt(dateArray[1])) || isNaN(Number.parseInt(dateArray[2]))) return false;
        
        const year = Number.parseInt(dateArray[2]);
        const month = Number.parseInt(dateArray[1])-1;
        const day = Number.parseInt(dateArray[0]);
        const actualDate = new Date();
        
        if(year > actualDate.getFullYear()) return false;
        if(month < 0 && month > 11) return false;
        if(day < 1 && day > 31) return false;
        
        return true;
    }

    showUser(): IUserModel {
        return {
            name: this.name,
            dateOfBirth: this.dateOfBirth,
            thingsItLikes: this.thingsItLikes,
            friends: this.friends
        }
    }
}