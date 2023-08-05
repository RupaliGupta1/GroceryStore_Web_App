import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {

  showLoadMoreProductButton = false;
  pageNumer: number = 0;
  productDetails: Product[] = [];
  showTable = false;

  //displaye columns contains all colums names for show details
  displayedColumns: string[] = ['Id', 'Product Name', 'description', 'Product Discounted Price', 'Product Actual Price', 'Actions'];

  constructor(private productService: ProductService,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(searchkeyword: string = "") {
    this.showTable = false;
    this.productService.getAllProducts(this.pageNumer, searchkeyword)
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
      .subscribe(
        (response: Product[]): void => {
          console.log(response);
          response.forEach(product => this.productDetails.push(product));//to add new data 
          this.showTable = true;

          if (response.length == 12)//in one batch loading 12 pro
          {
            this.showLoadMoreProductButton = true;
          }
          else {
            this.showLoadMoreProductButton = false;
          }
          //     this.productDetails = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }

      );
  }

  deleteProduct(productId: any) {


    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00802b',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.productService.deleteProduct(productId).subscribe(
          (response) => {
            this.getAllProducts();
          },
          (error: HttpErrorResponse) => {
            Swal.fire('Oops....', 'Something went wrong', 'error');

          }

        );
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }


    })



  }

  showImages(product: Product) {
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages
      },

      height: '500px',
      width: '800px'
    });
  }

  editProductDetails(productId: any) {

    this.router.navigate(['/addNewProduct', { productId: productId }]);
  }


  public loadMoreProduct() {
    this.pageNumer = this.pageNumer + 1;

    this.getAllProducts();
  }


  searchByKeyword(searchkeyword: string | undefined) {
    console.log(searchkeyword);
    this.pageNumer = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);
  }



}


//alomst same as home but add div before table in showproductdeatilhtml
//make var show tble