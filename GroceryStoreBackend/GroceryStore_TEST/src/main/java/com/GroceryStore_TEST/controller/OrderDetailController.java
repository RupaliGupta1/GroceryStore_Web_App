package com.GroceryStore_TEST.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.GroceryStore_TEST.entity.OrderDetail;
import com.GroceryStore_TEST.entity.OrderInput;
import com.GroceryStore_TEST.entity.TransactionDetails;
import com.GroceryStore_TEST.service.OrderDetailService;


@RestController
public class OrderDetailController 
{
	@Autowired
	private OrderDetailService orderDetailService; 

	
	@PreAuthorize("hasRole('User')")
	@PostMapping({"/placeOrder/{isCartCheckout}"})
	public void placeOrder(@PathVariable(name = "isCartCheckout") boolean isCartCheckout,
							@RequestBody OrderInput orderInput)
	{
		orderDetailService.placeOrder(orderInput, isCartCheckout);
	}
	
	//API to retrieve order details of user
		@PreAuthorize("hasRole('User')")
		@GetMapping("/getOrderDetails")
		public List<OrderDetail> getOrderDetails()
		{
			return orderDetailService.getOrderDetails();
		}
		
		
		//API to show all orders to Admin
		@PreAuthorize("hasRole('Admin')")
		@GetMapping("/getAllOrderDetails/{status}")
		public List<OrderDetail> getAllOrderDetails(@PathVariable(name="status") String status)
		{
			return orderDetailService.getAllOrderDetails(status);
		}
		
		
		//Api to change order status once order is delivered, admin will change status once order is delivered  
		@PreAuthorize("hasRole('Admin')")
		@GetMapping({"/markOrderAsDelivered/{orderId}"})
		public void markOrderAsDelivered(@PathVariable(name="orderId") Integer orderId)
		{
			orderDetailService.markOrderAsDelivered(orderId);
		}
		
		
		
		
		@PreAuthorize("hasRole('User')")
		@GetMapping("/createTransaction/{amount}")
		public TransactionDetails createTransaction(@PathVariable(name = "") Double amount)
		{
		   return orderDetailService.createTransaction(amount);
		}
}
