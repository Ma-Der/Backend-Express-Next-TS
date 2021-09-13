import { Product } from '../Models/product';
import { products, discounts } from '../Models/db/database';
import { IProduct } from '../Types/productTypes';
import { Validation } from '../Validation/Validation';

export class ProductHandler {

    public static createProduct(productName: string, productPrice: number) {
        if(productName.length < 3) throw new Error('Product name should be at least 3 characters.');
        if(!Validation.isPositiveNumber(productPrice)) throw new Error("Product price should be greater than zero.");
        
        const newProduct = new Product(productName, productPrice);
        products.push(newProduct);
        return newProduct.getProductData();
    }

    public static changeProductName(productId: string, newProductName: string) {
        if(!this.isProductExists(productId)) throw new Error("Product does not exists.");

        const productToUpdate = products.find(({ id }) => id === productId);
        productToUpdate?.changeProductName(newProductName);

        return productToUpdate?.getProductData();
    }

    public static changeProductPrice(productId: string, newProductPrice: number) {
        if(!this.isProductExists(productId)) throw new Error("Product does not exists.");

        const productToUpdate = products.find(({ id }) => id === productId);
        productToUpdate?.changeProductPrice(newProductPrice);

        return productToUpdate?.getProductData();
    }

    public static deleteProduct(productId: string) {
        if(!this.isProductExists(productId)) throw new Error("Product does not exists.");

        const arrOfProducts = products.filter(product => product.id !== productId);

        return this.getAllProducts();
    }

    public static addDiscountToProduct(productId: string, discountKey: string) {
        if(!this.isProductExists(productId)) throw new Error("This product does not exists in database.");

        const searchedProduct = products.find(({id}) => id === productId) as IProduct;

        const discount = discounts.find(discount => discount.key === discountKey);
        if(!discount) throw new Error("Discount does not exist in database.");

        searchedProduct.addDiscount(discount.value);
        
        return searchedProduct.getProductData();
        
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