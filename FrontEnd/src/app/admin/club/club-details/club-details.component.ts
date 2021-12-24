import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { Club } from '../club.model';
import { clubs } from '../clubs-list';
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
    // this.route.paramMap.subscribe(params => {
    //   const clubId = params.get("id");
    //   this.club = clubs.filter(club =>club.id === clubId)[0];
    // });
    
  //  this.adminService.getEvents(JSON.parse(this.adminId).club_id);
     this.clubSub = this.adminService.getClubsUpdateListener()
    .subscribe((res:any)=>{
      this.clubslist = res;
       this.route.paramMap.subscribe(params => {
        const clubId = params.get("id");
        this.club = this.clubslist.find(club =>club.id == clubId);
        this.formEdit = new FormGroup({
          club_id: new FormControl(this.club.id,{validators:[Validators.required]}),
          club_name: new FormControl(this.club.name,{validators:[Validators.required]}),
          club_theme: new FormControl(this.club.theme,{validators:[Validators.required]}),
          about: new FormControl(this.club.about,{validators:[Validators.required]}),
          club_img: new FormControl(null,{validators:[Validators.required]})
        });

      });
    });
  }
  onImagePicked(club :Club){
    const file = (club.target as HTMLInputElement).files[0];
    this.formEdit.patchValue({club_img:file});
    this.formEdit.get('club_img').updateValueAndValidity();
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
   await this.adminService.deleteClub(this.club.id);
   this.router.navigate(['admin/club']);
  }
}
