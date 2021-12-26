import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';
import { Team } from '../team.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  private eventSub : Subscription;
  public team?: Team;
  public teamsList : Team[]= [];
  public showEventEditForm: boolean = false;
  formEdit:FormGroup;
  imagePreview:string;

  constructor(private route:ActivatedRoute,private managerService:ManagerService,private router:Router) { }
  ngOnInit(): void {

    this.managerService.getTeamList();
    this.route.paramMap.subscribe(params=>{
      const teamId=params.get("id");
      this.managerService.getupdatedTeamListener()
      .subscribe(res => {
        const teamList = res;
        this.team = teamList.find(t=>t.id==teamId);
        this.formEdit = new FormGroup({
          team_id: new FormControl(this.team.id,{validators:[Validators.required]}),
          team_name: new FormControl(this.team.team_name,{validators:[Validators.required]}),
          team_img: new FormControl(null,{validators:[Validators.required]}),
          team_fb: new FormControl(this.team.team_fb),
          team_titre: new FormControl(this.team.team_titre),
          team_insta: new FormControl(this.team.team_insta),
          team_linkedin: new FormControl(this.team.team_linkedin),
          team_twitter: new FormControl(this.team.team_twitter)

        });
      });
    });
  }

  onImagePicked(event :Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.formEdit.patchValue({team_img:file});
    this.formEdit.get('team_img').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }
  oneEditSubmit() {
    this.route.paramMap.subscribe(params => {
      const team_id=params.get('id');
    if(this.formEdit.value.team_img == null){
      this.managerService.editEventNoImage(this.formEdit.value);
      // console.log(this.formEdit.value);


    }else{
    this.managerService.editTeam(this.formEdit.value,team_id);
    }});
}
  showEditForm(){
    this.showEventEditForm = !this.showEventEditForm;
  }

  async onDeleteTeam(){
   await this.managerService.deleteTeam(this.team.id);
   this.router.navigate(['dash-respo/team']);
  }
}
