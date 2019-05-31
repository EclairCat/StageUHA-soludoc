import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { authService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService : authService, private router : Router){
  }

  canActivate(): boolean {
    if(this.authService.loggedIn())
    {
      return true;
    }
    else{
      this.router.navigate(['/log-in/client']);
      return false;
    }
  }
}
