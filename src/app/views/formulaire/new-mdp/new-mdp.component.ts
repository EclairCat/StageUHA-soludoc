import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-mdp',
  templateUrl: './new-mdp.component.html',
  styleUrls: ['./new-mdp.component.css']
})
export class NewMdpComponent implements OnInit {

  constructor() { }

  //Mdp condition
  mdpNonEgal = false;   //le mot de passe et la confirmation ne sont pas égaux
  mdpCourt= false;      //Le mot de passe a moins de 10 caractères
  mdpNonValide = false; //le mod de passe ne contient pas 1 lettre, 1 chiffre et 1 caractère spécial

  formValid = false;    //le formulaire est validé




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

  validateForm(){
    if(this.mdpCourt || this.mdpNonEgal || this.mdpNonValide)
    {
      this.formValid = false;
    }
    else{
      this.formValid = true;
    }
  }

  ngOnInit() {
  }

}
