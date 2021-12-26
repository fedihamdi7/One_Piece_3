import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import { User } from '../user.model';
import { users } from "../users-list";


@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

private eventSub : Subscription;
constructor(private adminService : AdminService, private route:ActivatedRoute,private router:Router) { }

imagePreview:string;
formEdit:FormGroup;
public user?:User;
// public showAddUserForm = false;
public userlis;
public showEventEditForm=false;

ngOnInit(): void {
  this.formEdit = new FormGroup({
    name: new FormControl(null,{validators:[Validators.required]}),
    email: new FormControl(null,{validators:[Validators.required]}),
   type: new FormControl(null,{validators:[Validators.required]}),
   user_img: new FormControl(null,{validators:[Validators.required]}),
  });
  
  this.route.paramMap.subscribe(params=>{
    const userId=params.get("id");
   this.adminService.getUser(userId) .subscribe(
    (resultat:any) => {
      console.log(resultat);
      this.user = resultat;
    
    }
  );
  })
}
onImagePicked(event :Event){
  const file = (event.target as HTMLInputElement).files[0];
  this.formEdit.patchValue({user_img:file});
  this.formEdit.get('user_img').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result as string;
  };
  reader.readAsDataURL(file);

}
showEditForm(){this.showEventEditForm=true;}
onDeleteUser(){
  this.route.paramMap.subscribe(params=>{
    const userId=params.get("id");
  this.adminService.DeleteUser(userId);
  this.router.navigate(['admin/user']);
})
}
oneEditSubmit(){
  this.route.paramMap.subscribe(params=>{
    const userId=params.get("id");
  this.adminService.EditUser(this.formEdit.value,userId);
  })
}

}
