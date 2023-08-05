package com.GroceryStore_TEST.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GroceryStore_TEST.configuration.JwtRequestFilter;
import com.GroceryStore_TEST.dao.CartDao;
import com.GroceryStore_TEST.dao.OrderDetailDao;
import com.GroceryStore_TEST.dao.ProductDao;
import com.GroceryStore_TEST.dao.UserDao;
import com.GroceryStore_TEST.entity.Cart;
import com.GroceryStore_TEST.entity.OrderDetail;
import com.GroceryStore_TEST.entity.OrderInput;
import com.GroceryStore_TEST.entity.OrderProductQuantity;
import com.GroceryStore_TEST.entity.Product;
import com.GroceryStore_TEST.entity.TransactionDetails;
import com.GroceryStore_TEST.entity.User;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;

@Service
public class OrderDetailService 
{

	
	private static final String  ORDER_PLACED="Placed"; //order status 
	private static final String KEY="rzp_test_Gdsyeab4wMhFDE";
	private static final String KEY_SECRET="RfxhcKUtkt4G9Tb6tZRERuxQ";
	private static final String CURRENCY="INR";

	
	@Autowired
	private OrderDetailDao orderDetailDao;
	
	
	@Autowired
	private ProductDao productDao;
	
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private CartDao cartDao;
	
	
	

	public void placeOrder(OrderInput orderInput, boolean isCartCheckout)
	{
		List<OrderProductQuantity> productQuantityList=orderInput.getOrderProductQuantityList();
		for(OrderProductQuantity o: productQuantityList)
		{
			Product product=productDao.findById(o.getProductId()).get();  //id is present in OrderProductQuantity
			
			
			String currentUser=JwtRequestFilter.CURRENT_USER;
			User user=userDao.findById(currentUser).get();
			OrderDetail orderDetail=new OrderDetail(
					orderInput.getFullName(),
					orderInput.getFullAddress(),
					orderInput.getContactNumber(),
					orderInput.getAlternateContactNumber(),
					ORDER_PLACED,
					product.getProductDiscountedPrice()*o.getQuantity(),
					orderInput.getTransactionId(),
					product,
					user
					);
			
			//empty the cart
			if(!isCartCheckout)
			{
				List<Cart> carts = cartDao.findByUser(user);
				carts.stream().forEach(x -> cartDao.delete(x));
				//carts.stream().forEach(x. -> cartDao.deleteById(x.getCartId()));
			}
			
			orderDetailDao.save(orderDetail);
		}
		
	}
	
	//get OrderDetails
		public List<OrderDetail> getOrderDetails() 
		{
			String currentUser=JwtRequestFilter.CURRENT_USER;
			User user=userDao.findById(currentUser).get(); //it will fetch details of User
			
			return orderDetailDao.findByUser(user); 
		}
		
		//method to return all orders for admin
		public List<OrderDetail> getAllOrderDetails(String status)
		{
			List<OrderDetail> orderDetails = new ArrayList<>();
			
			if(status.equals("All")) {
			orderDetailDao.findAll().forEach(
					x -> orderDetails.add(x)
					);
			}
			else
			{
				orderDetailDao.findByOrderStatus(status).forEach(
						x -> orderDetails.add(x)
						);
			}
			return orderDetails;
		}
		
		
		
		//method to change order status
		public void markOrderAsDelivered(Integer orderId)
		{
			OrderDetail orderDetail=orderDetailDao.findById(orderId).get();
			if(orderDetail!=null)
			{
				orderDetail.setOrderStatus("Delivered");
				orderDetailDao.save(orderDetail);
			}
		}
		
		
		
		//to payment   //10000 came it ill consider as 10Paise so mul by 100
				public TransactionDetails createTransaction(Double amount)
				{
					//amount,currency,KEY,Secrtkey
				try {
					JSONObject jsonObject=new JSONObject();
					jsonObject.put("amount", (amount*100));//razor pay consider smallest value so thstwhy multiply by 100
					jsonObject.put("currency", CURRENCY);
										
				   RazorpayClient razorpayClient=new RazorpayClient(KEY, KEY_SECRET);
			
				   Order order=	razorpayClient.orders.create(jsonObject);
				   TransactionDetails transactionDetails= prepareTransactionDetails(order);
				   return transactionDetails;
			
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}
				return null;
				}
				
				
				private TransactionDetails prepareTransactionDetails(Order order) {
					String orderId=order.get("id");
					String currency=order.get("currency");
				  Integer amount=order.get("amount");
					
					TransactionDetails transactionDetails=new TransactionDetails(orderId, currency, amount,KEY);
					
					return transactionDetails;
				}
}
