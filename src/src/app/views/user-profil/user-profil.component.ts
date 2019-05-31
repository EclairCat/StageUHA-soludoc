import { Component, OnInit } from '@angular/core';
import { apiClient } from '../../services/apiClient.service';
import { Client } from '../../classes/Client';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
  constructor(private apiClient: apiClient, private router : Router) { }
  
  clientModel = new Client;

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
    this.apiClient.getClientById(localStorage.getItem('token')).subscribe(
      data => {
        this.clientModel = data[0];
        console.log(data);
      },
      err =>{
        if(err instanceof HttpErrorResponse){
          if(err.status===401)
          {
            this.router.navigate(['/log-in/client']);
          }
        }
      }
    )
  }

  editSubmit = 0;

  onSubmit() {
    this.apiClient.editClient(this.clientModel).subscribe(
      data => {
        console.log("success!", data);
        this.editSubmit = 1;
      },
      error => {
        console.log("Error! ", error);
        this.editSubmit = 2;
        this.emailNonValid = true;
      }
    ); 
  }
}
