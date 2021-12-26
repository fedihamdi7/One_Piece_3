import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IsManagerGuard } from '../guards/is-manager.guard';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit ,OnDestroy {
  private authListenerSubs : Subscription;
  private typeListenerSubs : Subscription;
  userIsAuthenticated = false;
  userType:string;
  manager : boolean;
  constructor(
    public authService : AuthService,
    ) { }

    ngOnInit(): void {
      const token = localStorage.getItem('id_token');
      if(token){
        this.userIsAuthenticated=true;
      }
      const type = JSON.parse(localStorage.getItem('user')).type;
      if(type=="manager"){
        this.manager=true;
      }
      
      this.typeListenerSubs = this.authService.getTypeListener().subscribe(type=>{
        this.userType = type;

        if(type=='manager'){
          this.manager = true;
        }
        else{
          this.manager = false;
        }
      });
      this.authListenerSubs= this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
        this.userIsAuthenticated= isAuthenticated;
      });



    }
    ngOnDestroy(): void {
      // this.typeListenerSubs.unsubscribe();
      // this.authListenerSubs.unsubscribe();
    }
  onLogoutClick() {
    this.authService.logout();
  }
}
