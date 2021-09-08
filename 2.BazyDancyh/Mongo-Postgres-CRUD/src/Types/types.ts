export interface ICat {
    name: string;
    color: string;
    gender: string;
    age: number;
    getCat(): ICatData;
}

export interface ICatData {
    name: string;
    color: string;
    gender: string;
    age: number;
}