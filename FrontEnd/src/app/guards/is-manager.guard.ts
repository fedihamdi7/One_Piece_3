import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsManagerGuard implements CanActivate {
  canActivate(): boolean{
    const type = JSON.parse(localStorage.getItem('user')).type;
    if(type=='manager'){
      return true;
    }
    else{
      return false;
    }
  }

}
