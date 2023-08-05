import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import {  Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  hide : boolean = true;
  validateForm!:FormGroup;
  
  confirmationvalidator=(control:FormControl):{[s:string]: boolean}=>
  {
    if(!control.value)
    {
      return {required: true}
    }
    else if(control.value!==this.validateForm.controls['password'].value)
    {
      return {confirm:true,error:true}
    }
    return {}
  }
  

  constructor(private userService:UserService,
    private router:Router,
    private _snackBar: MatSnackBar){}

    public user={
      userFirstName:'',
      userLastName:'',
      userName:'',
      userPassword:'',
      confirmPassword:''
  
    }
  ngOnInit(): void {
   
  }




  register(registerForm:NgForm)
  {

    


  // if(registerForm.errors)
  // {
  //   this._snackBar.open("All field required",'Ok',{duration:3000})
  //   return
  // }
    console.log(registerForm.value);

    if(registerForm.value.userFirstName===''|| registerForm.value.userFirstName===null)
    {
        this._snackBar.open("Firstname is required.",'Ok',{duration:3000})
        return
    }
   if(registerForm.value.userLastName===''|| registerForm.value.userLastName===null)
    {
        this._snackBar.open("Lastname is required.",'Ok',{duration:3000})
        return
    }
     if(registerForm.value.userName===''|| registerForm.value.userName===null)
    {
        this._snackBar.open("Email is required.",'Ok',{duration:3000})
        return
    }
    if(registerForm.value.userPassword===''|| registerForm.value.userPassword===null)
    {
        this._snackBar.open("Password is required.",'Ok',{duration:3000})
        return
    }

    if(registerForm.value.confirmPassword!=registerForm.value.userPassword)
    {
     this._snackBar.open("Password and confirm password should be same",'Ok',{duration:3000})
     return
    }

    this.userService.register(registerForm.value).subscribe(
    (response)=>{
      if(response===null){
        Swal.fire('Oops....','This email is already registered please try with another email.','error')
      }
      else{
        Swal.fire({icon: 'success',title:'User Registered Successfully'})
        this.router.navigate(['/login'])
     
      }
      console.log(response);
      
    },
    (error:any)=>{
      console.log(error);
      
    }
    );

 
  }



}

