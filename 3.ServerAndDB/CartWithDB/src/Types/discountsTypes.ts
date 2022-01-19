export interface IDiscountCode {
    discountCode: string;
    discountValue: number;
    showDiscount(): IDiscountCodeData;
}

export interface IDiscountCodeData {
    discountCode: string;
    discountValue: number;
}