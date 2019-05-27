import { Component, OnInit } from '@angular/core';
import { Medecin } from '../../../classes/Medecin';

import { apiMedecin } from '../../../services/apiMedecin.service';

@Component({
  selector: 'app-inscrip-medecin',
  templateUrl: './inscrip-medecin.component.html',
  styleUrls: ['./inscrip-medecin.component.css']
})
export class InscripMedecinComponent implements OnInit {
  constructor(private apiMedecin: apiMedecin) { }
  
  medecinModel = new Medecin;

  //Params
  formValid = false;    //le formulaire est validé


  //Mdp condition
  mdpNonEgal = false;   //le mot de passe et la confirmation ne sont pas égaux
  mdpCourt= false;      //Le mot de passe a moins de 10 caractères
  mdpNonValide = false; //le mod de passe ne contient pas 1 lettre, 1 chiffre et 1 caractère spécial


  validateMdp(value, confirmMdp){
    //Verifier que les 2 mot de passe sont pareils
    if(value != undefined && value == confirmMdp){
      this.mdpNonEgal = false;
    }
    else{
      this.mdpNonEgal= true;
    }
    //Verifie si le mot de passe contient bien au moins 1 lettre, 1 chiffre et 1 caractère special

    //Verifie si le mot de passe n'est pas court
    if(value != undefined && value.length <= 10){
      this.mdpCourt = true;
    }else{
      this.mdpCourt = false;
    }

    this.validateForm();
  }

  //Email condition
  emailNonValid = false; 

  emailChange(){
    this.emailNonValid = false;
  }


  validateForm(){
    if(this.mdpCourt || this.mdpNonEgal || this.mdpNonValide || this.emailNonValid)
    {
      this.formValid = false;
    }
    else{
      this.formValid = true;
    }
  }
  


  ngOnInit() {
  }

  inscriptionSubmit = 0;

  onSubmit() {
    console.log(this.medecinModel); 
    this.apiMedecin.addMedecin(this.medecinModel).subscribe(
      data => {
        console.log("success!", data);
        this.inscriptionSubmit = 1;
      },
      error => {
        console.log("Error! ", error);
        this.inscriptionSubmit = 2;
        this.emailNonValid = true;
      }
    ); 
  }
}
