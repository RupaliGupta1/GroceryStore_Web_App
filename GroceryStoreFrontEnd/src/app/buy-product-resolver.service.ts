import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './_model/product.model';
import { Observable, map } from 'rxjs';
import { ProductService } from './services/product.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]>{

  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService) { }


  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {

    const id = route.paramMap.get("id");
    const isSingleProductCheckout = route.paramMap.get("isSingleProductCheckout");
    return this.productService.getProductDetails(isSingleProductCheckout, id)
    .pipe(
      map(
        (x: Product[],i) => x.map((product: Product) => this.imageProcessingService.createImages(product))
      )
    );
  }
}
