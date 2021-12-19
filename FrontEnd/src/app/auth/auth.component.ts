import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  name:string;
  email:string;
  password:string;

  @ViewChild('signin') singInFrom:NgForm;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  onSigninSubmit(){
    // console.log(this.email,this.password);
    console.log(this.singInFrom);
    return this.http.get('http://localhost:3000/users/sender').pipe((res: any) => res).subscribe((res: any) => {
      console.log(res);
      });


  }

  onSignUpSubmit(){
    console.log(this.name,this.email,this.password);
  }


  // animation
  @ViewChild('signUp') signUpButton:ElementRef;
  @ViewChild('signIn') signInButton:ElementRef;
  @ViewChild('container') container:ElementRef;

 ngAfterViewInit(){
   this.signUpButton.nativeElement.addEventListener('click',()=>{
     this.container.nativeElement.classList.add('right-panel-active');
   })
   this.signInButton.nativeElement.addEventListener('click',()=>{
    this.container.nativeElement.classList.remove('right-panel-active');
  })
 }

}
