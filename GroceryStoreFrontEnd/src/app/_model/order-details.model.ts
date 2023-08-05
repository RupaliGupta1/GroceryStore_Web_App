import { OrderQuantity } from "./order-quantity.model";

export interface OrderDetails {


    fullName: string; //user's full name
    fullAddress: string;
    contactNumber: string;
    alternateContactNumber: string;
    transactionId:string;

    //list of products
    orderProductQuantityList: OrderQuantity[];
}