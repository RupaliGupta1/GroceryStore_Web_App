package com.GroceryStore_TEST.entity;

import java.util.List;

public class OrderInput 
{
	private String fullName; //user's full name
	private String fullAddress;
	private String contactNumber;
	private String alternateContactNumber;
	private String transactionId;
	
	public String getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	//list of products
	private List<OrderProductQuantity> orderProductQuantityList;     //to order multiple product in a single go we are using list

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getFullAddress() {
		return fullAddress;
	}

	public void setFullAddress(String fullAddress) {
		this.fullAddress = fullAddress;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getAlternateContactNumber() {
		return alternateContactNumber;
	}

	public void setAlternateContactNumber(String alternateContactNumber) {
		this.alternateContactNumber = alternateContactNumber;
	}

	public List<OrderProductQuantity> getOrderProductQuantityList() {
		return orderProductQuantityList;
	}

	public void setOrderProductQuantityList(List<OrderProductQuantity> orderProductQuantityList) {
		this.orderProductQuantityList = orderProductQuantityList;
	}
	
	
}
