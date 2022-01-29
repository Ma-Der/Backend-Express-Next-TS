export interface IUserMLM {
    id: number;
    userId: string;
    username: string;
    password: string;
    inferiors: string[];
    points: number;
    referrer: string;
}