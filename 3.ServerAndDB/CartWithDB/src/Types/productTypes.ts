export interface IProduct {
    id: string;
    productName: string;
    oldProductPrice: number;
    productPrice: number;
    discount: number;
}

export interface IProductData {
    id: string;
    productName: string;
    oldProductPrice: number;
    productPrice: number;
    discount: number;
}

export interface IProductToAdd {
    productName: string;
    productPrice: number;
}

export type ProductProperty = "productName" | "productPrice";