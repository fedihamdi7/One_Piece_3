import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(private requestService : RequestsService) { }
  public requests ;
  requestSub : Subscription;

  ngOnInit(): void {
    this.requestService.getRequests();
    this.requestSub = this.requestService.getRequestUpdateListener().subscribe(
      (requests) => {
        this.requests = requests;
      }
    );
  }

  acceptRequest(user_id,club_id){
    this.requestService.acceptRequest(user_id,club_id);
    window.location.reload();

  }

  declineRequest(user_id,club_id){
    this.requestService.declineRequest(user_id,club_id);
    window.location.reload();

  }


}
