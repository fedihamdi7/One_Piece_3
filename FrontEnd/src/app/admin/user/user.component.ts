import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from './user.model';
import { users } from './users-list';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public username="molka"
  imagePreview:string;
  public usersList : User[] = users;
  public fetchedUser;
  constructor(private userService : AdminService, private router:Router) { }
  formaddUser:FormGroup;
  public showAddUserForm = false;

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (resultatUser) => {
        this.fetchedUser = resultatUser;
      }
    );
    this.formaddUser = new FormGroup({
      name: new FormControl(null,{validators:[Validators.required]}),
      email: new FormControl(null,{validators:[Validators.required]}),
     password: new FormControl(null,{validators:[Validators.required]}),
     type: new FormControl(null,{validators:[Validators.required]}),
     user_img: new FormControl(null,{validators:[Validators.required]}),
    });
  }
  async onAddSubmit(){
    await this.userService.addUser(this.formaddUser.value);
    this.showAddUserForm = false;
   // this.router.navigate(['dash-respo/events']);
  }
  onImagePicked(event :Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.formaddUser.patchValue({user_img:file});
    this.formaddUser.get('user_img').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }


  onClickShowForm(){
    this.showAddUserForm = true;
  }
  onClickCloseForm(){
    this.showAddUserForm = false;
  }


}