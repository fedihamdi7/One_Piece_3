import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  formClub:FormGroup;
  imagePreview:string;

  constructor( private authService:AuthService) { }

  ngOnInit(): void {

    this.formClub = new FormGroup({
      title: new FormControl(null,{validators:[Validators.required]}),
      description: new FormControl(null,{validators:[Validators.required]}),
      image: new FormControl(null,{validators:[Validators.required]})
    });
  }

  onFormSubmit(){
    // console.log(this.formClub.value);
    this.authService.clubManager(this.formClub.value);
  }



  onImagePicked(event :Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.formClub.patchValue({image:file});
    this.formClub.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }

}
