import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public postList: any = [];
  public fetchedpost;
  formPost:FormGroup;
  imagePreview:string;
  currentImage:string;
  currentTitle:string;
  currentDescription:string;
  dataSub : Subscription;
  constructor(private managerService : ManagerService,private router:Router) { }

  ngOnInit(): void {
    this.fetchedpost= this.managerService.getPostList();
    this.managerService.getupdatedPostListener()
    .subscribe(postList=>{
      this.fetchedpost=postList;
    });
    this.formPost = new FormGroup({
      post_img : new FormControl(null,{validators:[Validators.required]}),
      post_description : new FormControl(null,{validators:[Validators.required]})
    });

    // this.dataSub = this.managerService.getupdatedPostListener()
    // .subscribe(postlist=>{
    //   this.fetchedpost=postlist;
    // });
  }

  onPostSubmit(){
    //  this.managerService.editPost(this.formPost.value);
     this.router.navigate(['dash-respo/change_post']);

  }
  onImagePicked(event :Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.formPost.patchValue({post_img:file});
    this.formPost.get('post_img').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }
  }


