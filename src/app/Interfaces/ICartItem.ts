import { IProduct } from "./Iproduct";

export interface ICartItem
{
    productId:string;
    quantity:number;
    Product?: IProduct;
}