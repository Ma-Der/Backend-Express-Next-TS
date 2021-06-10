import { IProductData } from "./productTypes";

export interface ICartItem {
    id: string;
    product: IProductData;
    amountOfProduct: number;
    changeProductName(newName: string): void;
    changeProductPrice(newPrice: number): void;
    changeAmountOfProduct(newAmount: number): void;
    calculatePrice(): number;
    getCartItemData(): ICartItemData;
}

export interface ICartItemData {
    id: string;
    productName: string;
    productPrice: number;
    amountOfProduct: number;
}