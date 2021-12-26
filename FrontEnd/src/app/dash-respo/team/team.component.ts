import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagerService } from "src/app/services/manager.service";
import { teams } from './team-list';
import { Team } from './team.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  public teamsList: any = [];
  public fetchedteam;
  public showAddEventForm=false;
  public formAdd:FormGroup;
  constructor(private managerService: ManagerService, private router:Router) {

  }

  ngOnInit(): void {
   this.fetchedteam= this.managerService.getTeamList();
   this.managerService.getupdatedTeamListener()
   .subscribe(teamlist=>{
     this.fetchedteam=teamlist;
   });
   this.formAdd=new FormGroup({
     team_name:new FormControl(null,{validators:[Validators.required]}),
     team_img:new FormControl(null,{validators:[Validators.required]}),
     team_titre:new FormControl(null,{validators:[Validators.required]}),
     team_fb:new FormControl(null),
     team_insta:new FormControl(null),
     team_linkedin:new FormControl(null),
     team_twitter:new FormControl(null),
    });
  }
  onOpenAddForm(){
    this.showAddEventForm=true;
  }
  onClickCloseForm(){
    this.showAddEventForm=false;
  }
public imagePreview:string;
    onImagePicked(event :Event){
      const file = (event.target as HTMLInputElement).files[0];
      this.formAdd.patchValue({team_img:file});
      this.formAdd.get('team_img').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
  }
  async onAddSubmit(){
    await this.managerService.addTeam(this.formAdd.value);
    this.showAddEventForm = false;
    this.router.navigate(['dash-respo/team']);
  }
}
