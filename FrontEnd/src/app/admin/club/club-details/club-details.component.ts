import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { Club } from '../club.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.css']
})
export class ClubDetailsComponent implements OnInit {
  private clubSub : Subscription;
  public club?:Club;
  public clubslist : Club[] = [];
  public showClubEditForm: boolean = false;
  formEdit:FormGroup;
  imagePreview:string;
  constructor(private route: ActivatedRoute,private adminService : AdminService, private router:Router) { }

  ngOnInit(): void {
    
   this.adminService.getClubs();
     this.clubSub = this.adminService.getClubsUpdateListener()
    .subscribe((res:any)=>{
      this.clubslist = res;
      
       this.route.paramMap.subscribe(params => {
        const clubId = params.get("id");
        this.club = this.clubslist.find(club =>club._id == clubId);
        
        this.formEdit = new FormGroup({
          _id: new FormControl(this.club._id,{validators:[Validators.required]}),
          title: new FormControl(this.club.title,{validators:[Validators.required]}),
          description: new FormControl(this.club.description,{validators:[Validators.required]}),
          image: new FormControl(this.club.image,{validators:[Validators.required]})
        });

      });
    });
  }
  onImagePicked(event :Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.formEdit.patchValue({image:file});
    this.formEdit.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }
  oneEditSubmit() {
    this.adminService.editClub(this.formEdit.value);
  }
  showEditForm(){
    this.showClubEditForm = !this.showClubEditForm;
  }

  async onDeleteClub(){
    this.route.paramMap.subscribe(params => {
      const clubId = params.get("id");
    this.adminService.deleteClub(clubId);
   this.router.navigate(['admin/club']);
   });

}
}
