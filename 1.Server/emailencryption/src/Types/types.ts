export interface IEmail {
    id: string;
    to: string;
    text: string;
    changeText(text: string): void;
    changeReciever(to: string): void;
    showEmail(): IEmailData;
}

export interface IEmailData {
    id: string;
    to: string;
    text: string;
}
