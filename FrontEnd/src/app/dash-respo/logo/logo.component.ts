import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  formLogo:FormGroup;
  imagePreview:string;
  currentLogo:string;
  LogoSub : Subscription;
  constructor( private managerService : ManagerService) { }

  ngOnInit(): void {
    this.managerService.getLogo();
    this.formLogo = new FormGroup({
      logo : new FormControl(null,{validators:[Validators.required]})
    });

    this.LogoSub = this.managerService.getLogoUpdateListener()
    .subscribe((res:any)=>{
      this.currentLogo = res;
    });
  }

  onLogoSubmit(){
    this.managerService.ChangeLogo(this.formLogo.value.logo);
  }
  onImagePicked(event :Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.formLogo.patchValue({logo:file});
    this.formLogo.get('logo').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }
}
