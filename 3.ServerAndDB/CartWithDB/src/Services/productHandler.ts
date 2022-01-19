import { Product } from '../Models/product';
import ProductMongo from '../Models/db/MongoModels/Product';
import DiscountMongo from '../Models/db/MongoModels/Discount';
import { ProductProperty } from '../Types/productTypes';

export class ProductHandler {

    public static async createProduct(productName: string, productPrice: number) {
        const newProduct = new Product(productName, productPrice);
        const newProductInDB = await ProductMongo.create(newProduct);
        if(!newProductInDB) throw new Error('SSomething went wrong with creating product.');

        return newProductInDB;
    }

    public static async changeProductProperty(productId: string, productProperty: ProductProperty, newProductValue: string | number) {

        const updatedProduct = await ProductMongo.findOneAndUpdate({id: productId}, {[productProperty]: newProductValue});
        if(!updatedProduct) throw new Error('No such product to update.');

        return updatedProduct;
    }

    public static async deleteProduct(productId: string) {
        const deletedProduct = await ProductMongo.deleteOne({id: productId});

        return deletedProduct;
    }

    public static async addDiscountToProduct(productId: string, discountCode: string) {
        const productToDiscount = await ProductMongo.findOne({id: productId});
        const discount = await DiscountMongo.findOne({discountCode: discountCode});
        if(!productToDiscount) throw new Error("Product does not exist with this id.");
        if(!discount) throw new Error("Discount does not exist in database.");

        const discountedPrice = this.calculatePrice(productToDiscount.productPrice, discount.discountValue);
        const updatedProduct = await ProductMongo.findOneAndUpdate({id: productId}, {
            productPrice: discountedPrice,
            discount: discount.discountValue
        });

        return updatedProduct;
    }

    public static async getAllProducts() {
        const allProducts = await ProductMongo.find({});
        if(!allProducts) throw new Error('No products in database.');

        return allProducts;
    }

    private static calculatePrice(productPrice: number, discountValue: number) {
        const finalPrice = productPrice - (productPrice * discountValue);
        return finalPrice;
    }
}