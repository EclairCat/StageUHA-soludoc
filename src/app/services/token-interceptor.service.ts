import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { authService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector : Injector) { }

  intercept(req, next){
    let auth = this.injector.get(authService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization : `Bearer ${auth.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }


}
