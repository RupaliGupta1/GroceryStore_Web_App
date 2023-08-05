import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));//convert obj into json formt
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles') || '{}');//to return arr 
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken') as string;
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();//if tokn is prsnt
  }

  public isAdmin(){
    const roles: any[] =this.getRoles();
    return roles[0].roleName === 'Admin';
  }

  public isUser(){
    const roles: any[] =this.getRoles();
    return roles[0].roleName === 'User';
  }
}