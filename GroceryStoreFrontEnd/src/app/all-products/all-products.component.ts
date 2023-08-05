import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { flatMap, map } from 'rxjs';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ImageProcessingService } from '../image-processing.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {



  pageNumber:number=0;

  showLoadButton=false;

  productDetails: Product[] = [];

  
  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService ,
    private router:Router,
    private _snackbar: MatSnackBar){}

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(searchKey:string="") {
    this.productService.getAllProducts(this.pageNumber,searchKey)
    .pipe(//if u perform anything before subscribing it and to convertion byte image to blob
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
