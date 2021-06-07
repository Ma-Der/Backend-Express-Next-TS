export interface ICartItem {
    id: string;
    productName: string;
    productPrice: number;
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