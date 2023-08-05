package com.GroceryStore_TEST.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class OrderDetail 
{

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer orderId;
	private String orderFullName;   //user's full name(user who'll be buying product)
	private String orderFullAddress;  //check this
	private String orderContactNumber;
	private String orderAlternateContactNumber;
	private String orderStatus;
	private Double orderAmount;
	private String transactionId;
	
	@OneToOne
	private Product product; //link b/w order and product
	
	@OneToOne
	private User user;  //user placing order
	

	

	

	public OrderDetail(String orderFullName, String orderFullAddress, String orderContactNumber,
			String orderAlternateContactNumber, String orderStatus, Double orderAmount, String transactionId,
			Product product, User user) {
		super();
		this.orderFullName = orderFullName;
		this.orderFullAddress = orderFullAddress;
		this.orderContactNumber = orderContactNumber;
		this.orderAlternateContactNumber = orderAlternateContactNumber;
		this.orderStatus = orderStatus;
		this.orderAmount = orderAmount;
		this.transactionId = transactionId;
		this.product = product;
		this.user = user;
	}


	public String getTransactionId() {
		return transactionId;
	}


	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}


	public Integer getOrderId() {
		return orderId;
	}


	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}


	public String getOrderFullName() {
		return orderFullName;
	}


	public void setOrderFullName(String orderFullName) {
		this.orderFullName = orderFullName;
	}


	public String getOrderFullAddress() {
		return orderFullAddress;
	}


	public void setOrderFullAddress(String orderFullAddress) {
		this.orderFullAddress = orderFullAddress;
	}


	public String getOrderContactNumber() {
		return orderContactNumber;
	}


	public void setOrderContactNumber(String orderContactNumber) {
		this.orderContactNumber = orderContactNumber;
	}


	public String getOrderAlternateContactNumber() {
		return orderAlternateContactNumber;
	}


	public void setOrderAlternateContactNumber(String orderAlternateContactNumber) {
		this.orderAlternateContactNumber = orderAlternateContactNumber;
	}


	public String getOrderStatus() {
		return orderStatus;
	}


	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}


	public Double getOrderAmount() {
		return orderAmount;
	}


	public void setOrderAmount(Double orderAmount) {
		this.orderAmount = orderAmount;
	}


	public OrderDetail() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Product getProduct() {
		return product;
	}


	public void setProduct(Product product) {
		this.product = product;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}
	
	
}
