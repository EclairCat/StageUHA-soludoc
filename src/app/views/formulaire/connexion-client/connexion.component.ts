import { Component, OnInit } from '@angular/core';
import { apiClient } from '../../../services/apiClient.service';
import { Router } from '@angular/router';
import { authService } from '../../../services/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  constructor(private apiClient : apiClient, private router: Router, private authService: authService) { }

  ngOnInit() {
  }

  email : string;
  mdp : string;

  errorLogin = false;

  onSubmit(){
    this.apiClient.loginClient(this.email, this.mdp).subscribe(
      data =>{
        console.log("login Sucess!");
        localStorage.setItem('token', data);
        localStorage.setItem('type', "0");
        this.router.navigate(['/home']);
      },
      error =>{
        console.log("Error!");
        this.errorLogin = true;
      }
    )
  }

}
