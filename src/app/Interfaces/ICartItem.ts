import { IProduct } from "./IProduct";


export interface ICartItem {
  productId: string;
  quantity: number;
  Product?: IProduct;
}