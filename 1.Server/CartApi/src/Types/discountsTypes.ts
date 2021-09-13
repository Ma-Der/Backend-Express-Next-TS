export interface IDiscountCode {
    key: string;
    value: number;
    showDiscount(): IDiscountCodeData;
}

export interface IDiscountCodeData {
    key: string;
    value: number;
}