export interface IDiscountCodeData {
    key: string;
    value: number;
}

export interface IDiscountCode {
    key: string;
    value: number;
    getDiscountCodeData(): IDiscountCodeData;
}