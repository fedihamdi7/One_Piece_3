import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  formAbout:FormGroup;
  currentAbout:string;
  AboutSub : Subscription;

  constructor(private managerService : ManagerService) { }

  ngOnInit(): void {
    this.managerService.getAbout();
    this.formAbout = new FormGroup({
      about : new FormControl(null,{validators:[Validators.required]})
    });

    this.AboutSub = this.managerService.getAboutUpdateListener()
    .subscribe((res:any)=>{
      this.currentAbout = res;
    });
  }

  onAboutSubmit(){
    this.managerService.ChangeAbout(this.formAbout.value.about);
    this.AboutSub = this.managerService.getAboutUpdateListener()
    .subscribe((res:any)=>{
      this.currentAbout = res;
    });

  }
  }


