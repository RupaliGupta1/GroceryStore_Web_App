import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent implements OnInit
{

  constructor(private router: Router){}

  ngOnInit(): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Unauthorized Access!!'
    })
   this.router.navigate(['']);
  }

}
