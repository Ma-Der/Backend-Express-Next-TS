import { number } from "joi";

export type StoreChainProperty = "name" | "owner";

export interface IStoreChain {
    name: string;
    owner: string;
}

export type ShopProperty = "name" | "address" | "storeChainId";

export interface IShop {
    name: string;
    address: string;
    storeChainId: number;
}

export type CategoryProperty = "name" | "similar_categories" | "shopId";

export interface ICategory {
    name: string;
    shopId: number;
}

export interface IRating {
    comment: string;
    rating: number;
}

export type ProductProperty = "name" | "price" | "amount" | "opinion" | "categoryId";

export interface IProduct {
    name: string;
    price: number;
    amount: number;
    opinion: string;
    categoryId: number;
}