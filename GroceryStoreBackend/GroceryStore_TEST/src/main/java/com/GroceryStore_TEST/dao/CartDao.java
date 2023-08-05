package com.GroceryStore_TEST.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.GroceryStore_TEST.entity.Cart;
import com.GroceryStore_TEST.entity.User;

public interface CartDao extends CrudRepository<Cart, Integer>
{
	public List<Cart> findByUser(User user);

}
