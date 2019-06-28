import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Services
import { apiMedecin } from '../../../services/apiMedecin.service';
import { apiSecretaire }from '../../../services/apiSecretaire.service';
import { authService} from '../../../services/auth.service';

@Component({
  selector: 'app-connexion-medecin',
  templateUrl: './connexion-medecin.component.html',
  styleUrls: ['./connexion-medecin.component.css']
})
export class ConnexionMedecinComponent implements OnInit {

  constructor(
    private apiMedecin: apiMedecin,
    private apiSecretaire: apiSecretaire,
    private router: Router,
    private authService: authService) { }

  ngOnInit() {
  }

  errorLogin1 = false;
  errorLogin2 = false;


  //Params Medecin
  emailM : string;
  mdpM: string;


  onSubmitM(){
    this.apiMedecin.loginMedecin(this.emailM, this.mdpM).subscribe(
      data =>{
        console.log("login Sucess!");
        localStorage.setItem('token', data);
        localStorage.setItem('type', "1");
        this.router.navigate(['/home']);
      },
      error =>{
        console.log("Error!");
        this.errorLogin1 = true;
      }
    )
  }

  //Params Secretaire
  emailS: string;
  mdpS : string;


  onSubmitS(){
    this.apiSecretaire.login(this.emailS, this.mdpS).subscribe(
      data =>{
        console.log("login Sucess!");
        localStorage.setItem('token', data);
        localStorage.setItem('type', "2");
        this.router.navigate(['/home']);
      },
      error =>{
        console.log("Error!");
        this.errorLogin2 = true;
      }
    )
  }
}
