import { IDiscountCodeData } from "./discountsTypes";

export interface IProduct {
    id: string;
    productName: string;
    oldProductPrice: number;
    productPrice: number;
    discount: number;
    changeProductName(newName: string): void;
    changeProductPrice(newPrice: number): void;
    calculatePrice(): void;
    addDiscount(discountValue: number): void;
    getProductData(): IProductData;
}

export interface IProductData {
    id: string;
    productName: string;
    oldProductPrice: number;
    productPrice: number;
    discount: number;
}