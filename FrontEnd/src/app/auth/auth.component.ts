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

  constructor(private authService:AuthService, private router:Router,private flashMessagesService : FlashMessagesService) { }

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
    this.authService.login(this.formLogin.value).subscribe(res => {
      if(res.status == 200) {
        this.router.navigate(['/']);
      }else{
        this.flashMessagesService.show('Something went wrong',{cssClass:'alert-danger',timeout:4000});
      }
    });
  }

  onSignUpSubmit(){
    this.authService.signup(this.formSignUp.value).subscribe(res => {
      if(res.status == 201) {
        this.formSignUp.reset();
        let element: HTMLElement = document.getElementById('signIn') as HTMLElement;
        element.click();
        this.flashMessagesService.show('You are now registered and can log in', { cssClass: 'alert-success'});

      }
    });
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
