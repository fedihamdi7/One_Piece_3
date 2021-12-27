import { Component, OnDestroy, OnInit } from '@angular/core';
import { Club } from './club.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit, OnDestroy {
   clubslist : Club[]  = [];
  private clubSub : Subscription;
  constructor(private adminService : AdminService, private router:Router) { }

  imagePreview:string;
  formAdd:FormGroup;
 // adminId = localStorage.getItem('user');
  public showAddClubForm = false;

  ngOnInit(): void {
    this.adminService.getClubs();

    this.clubSub = this.adminService.getClubsUpdateListener()
    .subscribe((clubs:any)=>{
      
      this.clubslist = clubs;
    });

    this.formAdd = new FormGroup({
      title: new FormControl(null,{validators:[Validators.required]}),
      description: new FormControl(null,{validators:[Validators.required]}),
      image: new FormControl(null,{validators:[Validators.required]})
    });
  }

  onImagePicked(event :Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.formAdd.patchValue({image:file});
    this.formAdd.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }
  async onAddSubmit(){
    await this.adminService.addClub(this.formAdd.value);
    this.showAddClubForm = false;
    this.router.navigate(['admin/club']);
  }





  onClickShowForm(){
    this.showAddClubForm = true;
  }
  onClickCloseForm(){
    this.showAddClubForm = false;
  }

  ngOnDestroy(): void {
    this.clubSub.unsubscribe();
  }
}
