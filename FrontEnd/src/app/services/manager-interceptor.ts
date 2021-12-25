import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ManagerInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const id = JSON.parse(localStorage.getItem('user')).userId;
    const token = localStorage.getItem('id_token');
    req = req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + token,
        'userId': id},
    }
    );
    console.log(req.headers);

    return next.handle(req);
  }

}
