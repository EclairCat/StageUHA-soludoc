import { Component } from '@angular/core';
import {authService} from './services/auth.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService : authService, private router : Router){

  }

  logout(){
    this.authService.logOut();
    this.router.navigate(['/log-in/client']);
  }

  title = 'siteMedecin';
}
