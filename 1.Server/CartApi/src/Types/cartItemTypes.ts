import { IProductData } from "./productTypes";

export interface ICartItem {
    id: string;
    product: IProductData;
    amountOfProduct: number;
    changeAmountOfProduct(newAmount: number): void;
    calculatePrice(): number;
    getCartItemData(): ICartItemData;
}

export interface ICartItemData {
    cartItemId: string;
    productName: string;
    productPrice: number;
    amountOfProduct: number;
}