import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute,Router } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';
import { Post } from './post.model';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public post?: Post;
  public postList : Post[]= [];
  // public fetchedpost;
  formPost:FormGroup;
  imagePreview:string;
  // currentImage:string;
  // currentTitle:string;
  // currentDescription:string;
  dataSub : Subscription;
  constructor(private route:ActivatedRoute,private managerService : ManagerService,private router:Router) { }

  ngOnInit(): void {
    this.managerService.getPostList();
    this.route.paramMap.subscribe(params=>{
      const postId=params.get("id");
    this.managerService.getupdatedPostListener()
    .subscribe(res => {
      const postList = res;
      this.post = postList.find(t=>t.id==postId);
    this.formPost = new FormGroup({
      post_title : new FormControl(null,{validators:[Validators.required]}),
      post_img : new FormControl(null,{validators:[Validators.required]}),
      post_description : new FormControl(null,{validators:[Validators.required]})
    });
  });
  });

    // this.dataSub = this.managerService.getupdatedPostListener()
    // .subscribe(postlist=>{
    //   this.fetchedpost=postlist;
    // });
  }

  onPostSubmit(){
    this.route.paramMap.subscribe(params => {
      const post_id=params.get('id');
    if(this.formPost.value.post_img == null){
      this.managerService.editEventNoImage(this.formPost.value);

    }else{
      console.log(this.formPost.value);

    this.managerService.editTeam(this.formPost.value,post_id);
    }});

  }
  onImagePicked(event :Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.formPost.patchValue({team_img:file});
    this.formPost.get('post_img').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }
  }


