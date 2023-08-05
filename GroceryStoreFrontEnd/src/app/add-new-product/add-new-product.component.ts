import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit{

  isNewProduct = true;
  
  product: Product = {
    productId: null,
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: []

  };
  

  
  constructor(private productService: ProductService , 
    private sanitizer : DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar){}
  
  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];

    if(this.product && this.product.productId){
      this.isNewProduct = false;
    }
  }

  addProduct(productForm : NgForm){

    // console.log(this.product);
    const formData = this.prepareFormData(this.product);


    Swal.fire({
      title: 'Do you want to add/update the Product?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
     
      if (result.isConfirmed) {
        this.productService.addProduct({ product: formData }).subscribe(
          (response : Product)=>{
            productForm.reset();
            this.product.productImages = [];
            Swal.fire('Saved!', '', 'success')
          },
          (error : HttpErrorResponse) =>{
            Swal.fire('Changes are not saved', '', 'info')

            console.log(error);
          }
        );
      
       
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })


  }

  prepareFormData(product: Product): FormData {
    const uploadImageData= new FormData();

    uploadImageData.append(
      'product',
      new Blob([JSON.stringify(product)], {type: 'application/json'})
    );

    for(var i = 0; i < product.productImages.length; i++) {
      uploadImageData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }

    return uploadImageData;
  }

  onFileSelected(event : any){
    if(event.target.files){
      const file1= event.target.files[0];

      const fileHandle : FileHandle = {
        file : file1,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file1)
        ),
      };

      this.product.productImages.push(fileHandle);
    }
  }

  removeImages(i : number)
  {
    this.product.productImages.splice(i, 1);
  }


  fileDropped(fileHandle : FileHandle) {
    this.product.productImages.push(fileHandle);
  }
}
