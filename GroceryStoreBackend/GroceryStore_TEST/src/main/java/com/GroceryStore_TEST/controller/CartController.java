package com.GroceryStore_TEST.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.GroceryStore_TEST.entity.Cart;
import com.GroceryStore_TEST.service.CartService;

@RestController
public class CartController {

	 @Autowired
	 private CartService cartService;
	
	 @PreAuthorize("hasRole('User')")
	 @GetMapping({"/addToCart/{productId}"})
	 public Cart addToCart(@PathVariable(name = "productId") Integer productId) 
	 {
		 return cartService.addToCart(productId);
	 }
	 
	 @PreAuthorize("hasRole('User')")
	 @GetMapping({"/getCartDetails"})
	 public List<Cart> getCartDetails() 
	 {
		 return cartService.getCartDetails();
	 }
	 
	 @PreAuthorize("hasRole('User')")
	 @DeleteMapping({"/deleteCartItem/{cartId}"})
	 public void deleteCartItem(@PathVariable(name = "cartId") Integer cartId) 
	 {
		 cartService.deleteCartItem(cartId);
	 }
}
