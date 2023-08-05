package com.GroceryStore_TEST.controller;



import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.GroceryStore_TEST.dao.UserDao;
import com.GroceryStore_TEST.entity.OrderDetail;
import com.GroceryStore_TEST.entity.User;
import com.GroceryStore_TEST.service.UserService;



@RestController
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private UserDao userDao;
    

    @PostConstruct
    public void initRoleAndUser() {
        userService.initRoleAndUser();
    }

    
   @PostMapping("/registerNewUser")
   public User registerNewUser(@RequestBody User user)
   {
	   User usname=userDao.findByUserName(user.getUserName());
	   if(usname!=null)
	   {
		   return null;
	   }
	   else {
		   return userService.registerNewUser(user);
	   }
   }
   
   
   
    @GetMapping({"/forAdmin"})
    @PreAuthorize("hasRole('Admin')")
    public String forAdmin(){
        return "This URL is only accessible to the admin";
    }

    @GetMapping({"/forUser"})
    @PreAuthorize("hasRole('User')")
    public String forUser(){
        return "This URL is only accessible to the user";
    }
    
    
	@PreAuthorize("hasRole('Admin')")
	@GetMapping("/getAllUserDetails")
	public List<User> getAllUserDetails()
	{
		return userService.getAllUserDetails();
	}
	
}
