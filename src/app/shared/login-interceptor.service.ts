import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap((event:HttpEvent<any>)=>{
      if(event instanceof HttpResponse){
        //if you want to do sth in case of success
      }
    }, (err:any)=>{
      if(err instanceof HttpErrorResponse){
        if(err.status ===401){
          console.log("Login failed (Incorrect credentials)");
        }
      }
    }));
  }
}
