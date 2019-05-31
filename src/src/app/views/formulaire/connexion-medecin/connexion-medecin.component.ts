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

  errorLogin = false;

  //Params Medecin
  emailM : string;
  mdpM: string;


  onSubmitM(){
    this.apiMedecin.loginMedecin(this.emailM, this.mdpM).subscribe(
      data =>{
        console.log("login Sucess!");
        localStorage.setItem('token', data);
        this.authService.ifMedecin = true;
        this.router.navigate(['/home']);
      },
      error =>{
        console.log("Error!");
        this.errorLogin = true;
      }
    )
  }

  //Params Secretaire
  emailS: string;
  mdpS : string;

  onSubmitS(){
    this.apiSecretaire.login(this.emailM, this.mdpM).subscribe(
      data =>{
        console.log("login Sucess!");
        localStorage.setItem('token', data);
        this.authService.ifSecretaire = true;
        this.router.navigate(['/home']);
      },
      error =>{
        console.log("Error!");
        this.errorLogin = true;
      }
    )
  }
}
