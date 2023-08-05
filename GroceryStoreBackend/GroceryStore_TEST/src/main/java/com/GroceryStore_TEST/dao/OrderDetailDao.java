package com.GroceryStore_TEST.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.GroceryStore_TEST.entity.OrderDetail;
import com.GroceryStore_TEST.entity.User;

public interface OrderDetailDao extends JpaRepository<OrderDetail, Integer>
{

	public List<OrderDetail> findByUser(User user);
	
	public List<OrderDetail> findByOrderStatus(String status);
}
