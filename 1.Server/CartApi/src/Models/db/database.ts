import { Cart } from '../cart';
import { ICart } from '../../Types/cartTypes';
import { IProduct } from '../../Types/productTypes';
import { IDiscountCode }from '../../Types/discountsTypes';

export const products: IProduct[] = [];
export const discounts: IDiscountCode[] = [];
export const cart: ICart = new Cart();
    
