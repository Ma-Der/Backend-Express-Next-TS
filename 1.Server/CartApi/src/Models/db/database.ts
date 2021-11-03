import { ICart } from '../../Types/cartTypes';
import { IProduct } from '../../Types/productTypes';
import { IDiscountCode }from '../../Types/discountsTypes';
import { IUser } from '../../Types/userTypes';

import { User } from '../user';
import { Product } from '../product';
import { Discount } from '../discount';

export const users: IUser[] = [];
export const products: IProduct[] = [];
export const discounts: IDiscountCode[] = [];
export const carts: ICart[] = [];

const user1 = new User('Mark', 'Smoth', 'email@email.com', 'sword');

const product1 = new Product('Hammer', 10);
const product2 = new Product('Nails', 0.2);
const product3 = new Product('Gun', 9);
const product4 = new Product('Coil', 3);
const product5 = new Product('Foil', 8);

const discount1 = new Discount('low', 0.05);
const discount2 = new Discount('mid', 0.1);
const discount3 = new Discount('high', 0.2);

users.push(user1);
products.push(product1, product2, product3, product4, product5);
discounts.push(discount1, discount2, discount3);
    
