import { Component, OnInit } from '@angular/core';
import { Secretaire } from 'src/app/classes/Secretaire';
import { apiSecretaire } from 'src/app/services/apiSecretaire.service';

@Component({
  selector: 'app-inscrip-secretaire',
  templateUrl: './inscrip-secretaire.component.html',
  styleUrls: ['./inscrip-secretaire.component.css']
})
export class InscripSecretaireComponent implements OnInit {

  constructor(private apiSec: apiSecretaire) { }
  
  secretaireModel = new Secretaire;

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
    this.secretaireModel.id_medecin = localStorage.getItem('token');

  }

  inscriptionSubmit = 0;

  onSubmit() {
    this.apiSec.addSecretaire(this.secretaireModel).subscribe(
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
