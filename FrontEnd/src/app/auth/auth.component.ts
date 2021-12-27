import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../services/auth.service';
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
  imagePreview:string;

  constructor(private authService:AuthService, private router:Router,private flashMessagesService : FlashMessagesService) { }

  ngOnInit(): void {
    this.formSignUp= new FormGroup({
      name: new FormControl(null,{validators:[Validators.required]}),
      email: new FormControl(null,{validators:[Validators.required , Validators.email]}),
      password: new FormControl(null,{validators:[Validators.required, Validators.minLength(6)]}),
      type : new FormControl(null,{validators:[Validators.required]}),
      user_img: new FormControl(null,{validators:[Validators.required]}),

    });

    this.formLogin= new FormGroup({
      email: new FormControl(null,{validators:[Validators.required , Validators.email]}),
      password: new FormControl(null,{validators:[Validators.required]})
    });

  }



  onSigninSubmit(){
    this.authService.login(this.formLogin.value);
  }

  onSignUpSubmit(){
    if ( this.formSignUp.value.type == "user"){
    this.authService.signup(this.formSignUp.value,this.formSignUp);
  }else if ( this.formSignUp.value.type == "manager"){
    this.authService.signup(this.formSignUp.value,this.formSignUp);
    this.router.navigate(['/auth-manager']);
    }
  }

  onImagePicked(event :Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.formSignUp.patchValue({user_img:file});
    this.formSignUp.get('user_img').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

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
