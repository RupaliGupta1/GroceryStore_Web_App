package com.GroceryStore_TEST.service;


import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.GroceryStore_TEST.configuration.JwtRequestFilter;
import com.GroceryStore_TEST.dao.CartDao;
import com.GroceryStore_TEST.dao.ProductDao;
import com.GroceryStore_TEST.dao.UserDao;
import com.GroceryStore_TEST.entity.Cart;
import com.GroceryStore_TEST.entity.Product;
import com.GroceryStore_TEST.entity.User;

@Service
public class ProductService
{
	@Autowired
    private ProductDao productDao;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private CartDao cartDao;


    public Product addNewProduct(Product product){
       return productDao.save(product);
    }

//    public List<Product> getAllProducts(int pageNo)
//    {
//    	 Pageable pageable=PageRequest.of(pageNo, 2);//page no will load thta page no products
//        return (List<Product>)productDao.findAll(pageable);
//    }
    
    public List<Product> getAllProducts(int pageNumber, String searchKey) {
		Pageable pageable = PageRequest.of(pageNumber, 12);
		
		if(searchKey.equals(""))
		{
			return (List<Product>) productDao.findAll(pageable);
		}
		else
		{
		  return (List<Product>) productDao.findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase(searchKey, searchKey, pageable);
		}
		
	}
    

    public Product getProductDetailsById(Integer productId)
    {
        return productDao.findById(productId).get();
    }

    public void deleteProductDetails(Integer productId) {
        productDao.deleteById(productId);
    }
    
  //get details of product when user clicks buy now
    public List<Product> getProductDetails(boolean isSingleProductCheckout, Integer productId)
    {
    	if(isSingleProductCheckout && productId != 0)
    	{
    		//we are going to buy single product
    		
    		List<Product> list=new ArrayList<>();
    		Product product = productDao.findById(productId).get();// using get, as findById returns optional so from optional we need to fetch productdeatils
    		list.add(product);
    		return list;
    	}
    	else
    	{
    		//we are going to checkout entire cart
    		String username = JwtRequestFilter.CURRENT_USER;
    		User user = userDao.findById(username).get();
    		List<Cart> carts = cartDao.findByUser(user);
    		
    		return carts.stream().map(x -> x.getProduct()).collect(Collectors.toList());
    	}
    }
    
}
