import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MyOrderDetails } from '../_model/order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {


  displayedColumns: string[] = ['OrderId', 'Product Name', 'Customer Name', 'Address', 'Contact No.', 'Status', 'Action'];
  myOrderDetails: MyOrderDetails[] = [];   //using MyOrderDetails Model, as it has all details

  status:string='All';


  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin(this.status);

  }


  getAllOrderDetailsForAdmin(statusParameter: string) {
    this.productService.getAllOrderDetailsForAdmin(statusParameter).subscribe(
      (resp) => {
        this.myOrderDetails = resp;
        console.log(resp)
      }, (err) => {
        console.log(err)
      }

    )
  }

  markAsDelivered(orderId: number) {
    console.log(orderId)
    this.productService.markAsDelivered(orderId).subscribe(
      (response) => {
        this.getAllOrderDetailsForAdmin(this.status)
        console.log(response)
      }, (err) => {
        console.log(err);
      }
    )
  }
}