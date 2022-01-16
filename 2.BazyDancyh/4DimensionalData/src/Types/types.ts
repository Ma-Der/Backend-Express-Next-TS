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