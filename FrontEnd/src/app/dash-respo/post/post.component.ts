import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';
import { Post } from './post.model';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public post: any;
  public postList: Post[] = [];
  // public fetchedpost;
  formPost: FormGroup;
  imagePreview: string;

  // currentImage:string;
  // currentTitle:string;
  // currentDescription:string;
  dataSub: Subscription;
  constructor(private route: ActivatedRoute, private managerService: ManagerService, private router: Router) { }
  ngOnInit(): void {

    this.managerService.getPost();
      this.managerService.getupdatedPostListener()
        .subscribe(res => {

          this.post = res[0];

          this.formPost = new FormGroup({
            post_title: new FormControl(res[0].post_title, { validators: [Validators.required] }),
            post_img: new FormControl(res[0].post_img, { validators: [Validators.required] }),
            post_description: new FormControl(res[0].post_description, { validators: [Validators.required] })
          });
        });

  }

  onPostSubmit() {

      const club_id = JSON.parse(localStorage.getItem('user')).club_id;
       this.managerService.editPost(this.formPost.value, club_id);

  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.formPost.patchValue({ post_img: file });
    this.formPost.get('post_img').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }
}


