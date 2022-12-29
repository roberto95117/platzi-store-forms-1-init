import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '@core/services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
      private token : TokenService
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.addToken(req);
    return next.handle(req);
  }

  private addToken(req: HttpRequest<any>){
    const token = this.token.getToken();
    if(true){
      req = req.clone({
        setHeaders: {
          token
        }
      });
      return req;
    }
    return req;
  }




}

