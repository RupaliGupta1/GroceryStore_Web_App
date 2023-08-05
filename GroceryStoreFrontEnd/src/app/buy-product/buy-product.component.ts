import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../services/product.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var Razorpay:any;
@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css'],

})
export class BuyProductComponent implements OnInit{

  isSingleProductCheckout: any = '';
  productDetails: Product[] =[];

  //initialize object for  product details
  orderDetails:OrderDetails=
  {
    fullName: '',
    fullAddress:'',
    contactNumber:'',
    alternateContactNumber: '',
    transactionId:'',
    orderProductQuantityList: []
  }

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private _snackbar: MatSnackBar){}


  ngOnInit(): void 
  {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];

    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");

     //below code is for making connection between productdetails and orderDetails
    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantityList.push(
        {productId: x.productId, quantity:1}
      )
    );

    console.log(this.productDetails);
    console.log(this.orderDetails);
  }


  public placeOrder(orderForm:NgForm){

   
    this.productService.placeOrder(this.orderDetails, this.isSingleProductCheckout).subscribe(
      (resp) =>{
        console.log(resp);
        orderForm.reset();
        this.router.navigate(["/orderConfirm"])
      },
      (err) =>{
        console.log(err)
      }
    );
    
  }

  getQuantityForProduct(productId: any){

    const filteredProduct= this.orderDetails.orderProductQuantityList.filter(
      (productQuantity)=> productQuantity.productId ===productId
    );
    return filteredProduct[0].quantity;
  }


  getCalculatedTotal(productId: any, productDiscountedPrice: any)
  {
    const filteredProduct=this.orderDetails.orderProductQuantityList.filter(
      (productQuantity)=> productQuantity.productId===productId
    );
    return filteredProduct[0].quantity * productDiscountedPrice
  }


  onQuantityChanged(q: any,productId: any)
  {
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct)=> orderProduct.productId ===productId
    )[0].quantity = q;

  }


  getCalculatedGrandTotal(){
    let grandTotal=0;
    
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity) => {
    const price = this.productDetails.filter(product => product.productId === productQuantity.productId)[0].productDiscountedPrice
    grandTotal = grandTotal+ price* productQuantity.quantity;
  }
    )
    return grandTotal;
  }




  createTransactionAndPlaceOrder(orderForm:NgForm)
  {
    if(this.orderDetails.fullName=='' || this.orderDetails.fullName==null)
    {
      this._snackbar.open('Please Enter Full Name','ok',{duration:3000,
        verticalPosition:'bottom',
      horizontalPosition:'center',
      panelClass: ['green-snackbar', 'login-snackbar']});

    }
   else if(this.orderDetails.fullAddress=='' || this.orderDetails.fullAddress==null)
    {
      this._snackbar.open('Please Enter Full Address','ok',{duration:3000,
        verticalPosition:'bottom',
      horizontalPosition:'center',
      panelClass: ['green-snackbar', 'login-snackbar']});
    }
   else if(this.orderDetails.contactNumber=='' || this.orderDetails.contactNumber==null )
    {
      this._snackbar.open('Please Enter Contact Number','ok',{duration:3000,
        verticalPosition:'bottom',
      horizontalPosition:'center',
      panelClass: ['green-snackbar', 'login-snackbar']});
    }

    else{
    let amount:any=this.getCalculatedGrandTotal();
    this.productService.createTransaction(amount).subscribe(
      (response)=>{
        console.log(response);
        this. openTransactionModal(response,orderForm);
      },
      (error)=>{
        console.log(error);
      }
    );
    }
  }



  openTransactionModal(response:any,orderForm:NgForm)
  {
    var options={
      order_id:response.orderId,
      key:response.key,
      amount:response.amount,
      currency:response.currency,
      name:'GroceryStore',
      description:'Payment of online grocery shopping',
      image:"../../assets/paymentImg.jpg",
      handler:(response:any)=>{
        if(response!=null && response.razorpay_payment_id!=null){
          this.processResponse(response,orderForm);
        }
        else{
          alert("Payment Failed...........");
        }
      },
      prefill:{
        name:'GS',
        email:'GS@GMAIL.COM',
        contact:'906906005'
      },
      notes:{
        address:'Online Shopping'
      },
      theme:{
        color:'#00802b'
      },
      modal:{
        ondismiss:()=>{
          console.log('dismissed');
          
        }
      }
    };
    var razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }

  processResponse(resp:any,orderForm:NgForm){
    this.orderDetails.transactionId=resp.razorpay_payment_id;
    this.placeOrder(orderForm);
    // console.log(resp);
  }
 }
