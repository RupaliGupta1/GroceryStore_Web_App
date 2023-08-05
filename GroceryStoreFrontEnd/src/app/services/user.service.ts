import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable } from 'rxjs';
import { UserDetails } from '../_model/userDetails.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:8080';
  

  //header which doesnot require authentication
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService,
 
  ) {}

  public login(loginData: any) {
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,              //thtswhy pass here tht no require header
    });
  }

  public register(registerData:any)
  {
  
    return this.httpclient.post(this.PATH_OF_API+'/registerNewUser',registerData);
  }

  //get all user details for admin only
  public getAllUserDetails(): Observable<UserDetails[]>
  {
    return this.httpclient.get<UserDetails[]>(this.PATH_OF_API+'/getAllUserDetails');
  }

  

  


  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }

  //it ll chck for authorization if role is given to user is same as using role it give true
  public roleMatch(allowedRoles: string | any[]) : boolean | undefined{
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if(userRoles != null && userRoles) {
      for(let i=0; i< userRoles.length; i++){
        for(let j=0; j<allowedRoles.length; j++)
        {
          if(userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          }
          else{
            return isMatch;
          }
        }
      }
    }
    return;
  }

  // public roleMatch(allowedRoles): boolean {
  //   let isMatch = false;
  //   const userRoles: any = this.userAuthService.getRoles();

  //   if (userRoles != null && userRoles) {
  //     for (let i = 0; i < userRoles.length; i++) {
  //       for (let j = 0; j < allowedRoles.length; j++) {
  //         if (userRoles[i].roleName === allowedRoles[j]) {
  //           isMatch = true;
  //           return isMatch;
  //         } else {
  //           return isMatch;
  //         }
  //       }
  //     }
  //   }
  // }
}