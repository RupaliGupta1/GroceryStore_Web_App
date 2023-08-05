import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';
import { Observable } from 'rxjs';
import { MyOrderDetails } from '../_model/order.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  PATH_OF_API = 'http://localhost:8080';
  

  constructor(private httpClient : HttpClient) { }

  public addProduct({ product }: { product: FormData; })
  {
    return this.httpClient.post<Product>(this.PATH_OF_API + '/addNewProduct', product);
  }

  public getAllProducts(pageNumber : number, searchKeyword: string = "") {
    return this.httpClient.get<Product[]>(this.PATH_OF_API + '/getAllProducts?pageNumber='+pageNumber+'&searchKey='+searchKeyword);
  }

  public getProductDetailsById(productId: string) {
    return this.httpClient.get<Product>(this.PATH_OF_API + '/getProductDetailsById/' + productId);
  }

  public deleteProduct(productId : number)
  {
    return this.httpClient.delete(this.PATH_OF_API + '/deleteProductDetails/' + productId);
  }

  public getProductDetails(isSingleProductCheckout: any, productId: any)
{
  return this.httpClient.get<Product[]>(this.PATH_OF_API+'/getProductDetails/'+isSingleProductCheckout+"/"+productId)
}


public placeOrder(orderDetails: OrderDetails, isCartCheckout: string | undefined)
{
  return this.httpClient.post(this.PATH_OF_API+'/placeOrder/'+isCartCheckout, orderDetails);
}
  
public addToCart(productId: string)
{
  return this.httpClient.get(this.PATH_OF_API+'/addToCart/'+productId);
}

public getCartDetails() {
  return this.httpClient.get(this.PATH_OF_API+'/getCartDetails/');
}

public deleteCartItem(cartId: string) {
  return this.httpClient.delete(this.PATH_OF_API+'/deleteCartItem/' + cartId);
}

//get my Orders
public getMyOrders(): Observable<MyOrderDetails[]>
{
  return this.httpClient.get<MyOrderDetails[]>(this.PATH_OF_API+'/getOrderDetails');
}

//get all orders for Admin
public getAllOrderDetailsForAdmin(status: string): Observable<MyOrderDetails[]>
{
  return this.httpClient.get<MyOrderDetails[]>(this.PATH_OF_API+'/getAllOrderDetails/'+status);
}


//func to change order status to delivered
public  markAsDelivered(orderId: number){
  return this.httpClient.get(this.PATH_OF_API+'/markOrderAsDelivered/'+orderId);
}

public createTransaction(amount:number)
  {
    return this.httpClient.get(this.PATH_OF_API+'/createTransaction/'+amount);
  }
}
