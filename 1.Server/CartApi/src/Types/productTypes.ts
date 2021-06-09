export interface IProduct {
    id: string;
    productName: string;
    productPrice: number;
    changeProductName(newName: string): void;
    changeProductPrice(newPrice: number): void;
    getProductData(): IProductData;
}

export interface IProductData {
    id: string;
    productName: string;
    productPrice: number;
}