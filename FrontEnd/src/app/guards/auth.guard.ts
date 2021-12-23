import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  userIsAuthenticated = false;
  canActivate(): boolean {
    const token = localStorage.getItem('id_token');
      if(token){
        this.userIsAuthenticated=true;
      }
    if (this.userIsAuthenticated) {
      console.log("guard true");

      return true;
    } else {
      console.log("guard false");

      this.router.navigate(['/auth']);
      return false;
    }
  }
}
