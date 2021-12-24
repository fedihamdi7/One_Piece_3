import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ManagerService } from 'src/app/services/manager.service';
import { EventType } from './event.model';
import { events } from './events-list';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit , OnDestroy {

  eventsList : EventType[] = [];
  private eventSub : Subscription;
  constructor(private managerService : ManagerService) { }

  imagePreview:string;
  formAdd:FormGroup;
  managerId = localStorage.getItem('user');
  public showAddEventForm = false;

  ngOnInit(): void {
    this.managerService.getEvents(JSON.parse(this.managerId).club_id);

    this.eventSub = this.managerService.getEventUpdateListener()
    .subscribe((events:any)=>{
      this.eventsList = events;
    });

    this.formAdd = new FormGroup({
      event_name: new FormControl(null,{validators:[Validators.required]}),
      event_date: new FormControl(null,{validators:[Validators.required]}),
      event_img: new FormControl(null,{validators:[Validators.required]})
    });
  }

  onImagePicked(event :Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.formAdd.patchValue({event_img:file});
    this.formAdd.get('event_img').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }
  onAddSubmit(){


    this.managerService.addEvent(this.formAdd.value);
  }





  onClickShowForm(){
    this.showAddEventForm = true;
  }
  onClickCloseForm(){
    this.showAddEventForm = false;
  }

  ngOnDestroy(): void {
    this.eventSub.unsubscribe();
  }

}
