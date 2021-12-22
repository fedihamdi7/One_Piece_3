import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  name:string;
  email:string;
  password:string;
  formSignUp:FormGroup;
  formLogin:FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.formSignUp= new FormGroup({
      name: new FormControl(null,{validators:[Validators.required]}),
      email: new FormControl(null,{validators:[Validators.required , Validators.email]}),
      password: new FormControl(null,{validators:[Validators.required, Validators.minLength(6)]})
    });

    this.formLogin= new FormGroup({
      email: new FormControl(null,{validators:[Validators.required , Validators.email]}),
      password: new FormControl(null,{validators:[Validators.required]})
    });

  }



  onSigninSubmit(){
    console.log(this.formLogin);
  }

  onSignUpSubmit(){
    console.log(this.formSignUp);
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
