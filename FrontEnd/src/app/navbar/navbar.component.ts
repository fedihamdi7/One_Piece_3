import { Component, OnDestroy, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit ,OnDestroy {
  private authListenerSubs : Subscription;
  userIsAuthenticated = false;
  constructor(
    public authService : AuthService,
    private flashMessageService : FlashMessagesService) { }

    ngOnInit(): void {
      this.authListenerSubs= this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
        this.userIsAuthenticated= isAuthenticated;
      });
    }
    ngOnDestroy(): void {
      this.authListenerSubs.unsubscribe();
    }
  onLogoutClick() {
    this.authService.logout();
    this.flashMessageService.show('You are logged out', {
       cssClass: 'alert-success', timeout: 1000
   });
}
}
