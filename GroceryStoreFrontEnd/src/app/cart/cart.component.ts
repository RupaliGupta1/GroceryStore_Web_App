import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  displayedColumns: string[] = ['Name', 'Description', 'Price', 'Discounted Price', 'Action'];
  
  cartDetails : any[] = [];
  
  constructor(private productService: ProductService,
              private router: Router,
              private _snackbar: MatSnackBar) {}
  
  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails() {
    this.productService.getCartDetails().subscribe(
      (response : any ) => {
        console.log(response);
        this.cartDetails = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  Checkout() {
    if( this.cartDetails.length==0){
      this._snackbar.open('Cannot checkout Cart is empty!!!','ok',{duration:3000,
        verticalPosition:'bottom',
      horizontalPosition:'center',
      panelClass: ['green-snackbar', 'login-snackbar']});
    }
    else{
    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout: false, id: 0
    }]);
  }
  }

  delete(cartId: any) {
    console.log(cartId);
    this.productService.deleteCartItem(cartId).subscribe(
      (response : any ) => {
        console.log(response);
        this.getCartDetails();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //   this.productService.getProductDetails(false, 0).subscribe(
  //     (response) =>{
  //       console.log(response)
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }


}
