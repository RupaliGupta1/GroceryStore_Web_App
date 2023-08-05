import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { flatMap, map } from 'rxjs';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../image-processing.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  pageNumber:number=0;

  showLoadButton=false;

  productDetails: Product[] = [];

  
  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService ,
    private router:Router,
    private _snackbar:MatSnackBar){}

  ngOnInit(): void {
    this.getAllProducts();
  }





  public getAllProducts(searchKey:string="") {
    this.productService.getAllProducts(this.pageNumber,searchKey)
    .pipe(
      map((x : Product[], i) => x.map((product : Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (response : Product[] ) => {
        console.log(response);
       if(response.length==12) //write size of each pages products
       {
        this.showLoadButton=true;
       }
       else{
        this.showLoadButton=false;
       }
        response.forEach(p=>this.productDetails.push(p));//we dont want to vnish existing page and adding more product below
   //     this.productDetails=response;
      },
      (error : HttpErrorResponse) =>{
        console.log(error);
      }

    );
  }




  showProductDetails(productId: any)
  {
    this.router.navigate(['/productViewDetails', {productId: productId}]);
  }

  public loadMoreProduct(){
   this.pageNumber=this.pageNumber+1;
   this.getAllProducts();
  }


  searchByKeyword(searchkeyword: any) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);
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






//home comp ts make var pagenumber and go to product service and also so chnges in showproductdetails ts
//add click on loadmore button and create loadmoreproduct here
//do changes in 46 and 39
//take showloadebutton var =false and go home html add ngif
//add 