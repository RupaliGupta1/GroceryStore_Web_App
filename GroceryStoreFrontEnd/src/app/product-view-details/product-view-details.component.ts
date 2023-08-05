import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit {

 

  selectedProductIndex=0;
  product : Product | any;      //check if this is correct
  
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService : ProductService,
    private _snackbar: MatSnackBar){}


  ngOnInit(): void {

    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product)
  }


  changeIndex(index:any)
  {
    this.selectedProductIndex=index;
  }


  buyProduct(productId: any){
    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout:true, id: productId
    }]);
  }


  addToCart(productId: any)
  {

  
    this.productService.addToCart(productId).subscribe(
      (response) => {
        Swal.fire({icon: 'success',title:'Product added to cart'});
          console.log(response);
        this.router.navigate(['/allproducts'])
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
