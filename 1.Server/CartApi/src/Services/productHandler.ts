import { Product } from '../Models/product';
import { products } from '../Models/db/database';

export class ProductHandler {
    public static createProduct(productName: string, productPrice: number) {
        if(productName.length < 3) throw new Error('Product name should be at least 3 characters.');
        if(productPrice <= 0) throw new Error("Product price should be greater than zero.");
        
        const newProduct = new Product(productName, productPrice);
        products.push(newProduct);
    }

    public static changeProductName(productId: string, newProductName: string) {
        if(!this.isProductExists(productId)) throw new Error("Product does not exists.");

        const productToUpdate = products.find(({ id }) => id === productId);
        productToUpdate?.changeProductName(newProductName);
    }

    public static changeProductPrice(productId: string, newProductPrice: number) {
        if(!this.isProductExists(productId)) throw new Error("Product does not exists.");

        const productToUpdate = products.find(({ id }) => id === productId);
        productToUpdate?.changeProductPrice(newProductPrice);
    }

    public static deleteProduct(productId: string) {
        if(!this.isProductExists(productId)) throw new Error("Product does not exists.");

        const arrOfProducts = products.filter(product => product.id !== productId);
    }

    public static getAllProducts() {
        return products.map(product => product.getProductData());
    }

    private static isProductExists(id: string): boolean {
        const product = products.find(item => item.id === id);
        if(product) return true;
        return false;
    }
}