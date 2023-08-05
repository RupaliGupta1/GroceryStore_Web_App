import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserDetails } from '../_model/userDetails.model';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit
{


  displayedColumns: string[]=['UserName','First Name','Last Name'];

  userDetails: UserDetails[]=[];
  

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.getUserDetails();
  }



  getUserDetails(){
    this.userService.getAllUserDetails().subscribe(
     (resp:UserDetails[])=>{
      console.log(resp);
      this.userDetails= resp;

     },(err)=>{
      console.log(err) ;
     });
  }
}
