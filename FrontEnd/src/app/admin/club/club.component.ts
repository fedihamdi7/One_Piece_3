import { Component, OnDestroy, OnInit } from '@angular/core';
import { Club } from './club.model';
import { clubs } from './clubs-list';
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
      console.log(clubs);
      
      this.clubslist = clubs;
    });

    this.formAdd = new FormGroup({
      club_name: new FormControl(null,{validators:[Validators.required]}),
      club_theme: new FormControl(null,{validators:[Validators.required]}),
      about: new FormControl(null,{validators:[Validators.required]}),
      club_img: new FormControl(null,{validators:[Validators.required]})
    });
  }

  // onImagePicked(club :Club){
  //   const file = (club.target as HTMLInputElement).files[0];
  //   this.formAdd.patchValue({club_img:file});
  //   this.formAdd.get('club_img').updateValueAndValidity();
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imagePreview = reader.result as string;
  //   };
  //   reader.readAsDataURL(file);

  // }
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
