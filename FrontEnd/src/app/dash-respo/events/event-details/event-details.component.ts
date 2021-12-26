import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ManagerService } from 'src/app/services/manager.service';
import { EventType } from '../event.model';
;

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  private eventSub : Subscription;

  public event?: EventType;
  public eventsList : EventType[]= [];
  public showEventEditForm: boolean = false;
  formEdit:FormGroup;
  imagePreview:string;

  constructor(private route: ActivatedRoute,private managerService : ManagerService, private router:Router) { }
  managerId = localStorage.getItem('user');

  ngOnInit(): void {

    this.managerService.getEvents(JSON.parse(this.managerId).club_id);
     this.eventSub = this.managerService.getEventUpdateListener()
    .subscribe((res:any)=>{
      this.eventsList = res;
       this.route.paramMap.subscribe(params => {
        const eventId = params.get("id");
        this.event = this.eventsList.find(e => e.event_id == eventId);
        this.formEdit = new FormGroup({
          event_id: new FormControl(this.event.event_id,{validators:[Validators.required]}),
          event_name: new FormControl(this.event.event_name,{validators:[Validators.required]}),
          event_date: new FormControl(this.event.event_date,{validators:[Validators.required]}),
          event_img: new FormControl(null,{validators:[Validators.required]})
        });

      });
    });

  }

  onImagePicked(event :Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.formEdit.patchValue({event_img:file});
    this.formEdit.get('event_img').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }
  oneEditSubmit() {
    if(this.formEdit.value.event_img == null){
      this.managerService.editEventNoImage(this.formEdit.value);
      // console.log(this.formEdit.value);


    }else{
    this.managerService.editEvent(this.formEdit.value);
    }
}
  showEditForm(){
    this.showEventEditForm = !this.showEventEditForm;
  }

  async onDeleteEvent(){
   await this.managerService.deleteEvent(this.event.event_id);
   this.router.navigate(['dash-respo/events']);
  }

}
