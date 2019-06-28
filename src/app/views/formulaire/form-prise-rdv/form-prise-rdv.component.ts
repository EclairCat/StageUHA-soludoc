import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { apiMedecin } from 'src/app/services/apiMedecin.service';
import { apiRdv } from 'src/app/services/apiRdv.service';
import { Rdv } from 'src/app/classes/Rdv';
import { apiClient } from 'src/app/services/apiClient.service';
import { Client } from 'src/app/classes/Client';
import { authService } from 'src/app/services/auth.service';
import { Medecin } from 'src/app/classes/Medecin';

@Component({
  selector: 'app-form-prise-rdv',
  templateUrl: './form-prise-rdv.component.html',
  styleUrls: ['./form-prise-rdv.component.css']
})
export class FormPriseRdvComponent implements OnInit {

  constructor(private route:ActivatedRoute, private apiMedecin: apiMedecin, private apiRdv: apiRdv, private apiClient: apiClient, private authService : authService, private router : Router) { }

  rdv = new Rdv;
  idmedecin;
  client = new Client;
  medecin =new Medecin;
  selectedDate;
  heure;
  boolRdvSuccess =false;

  onSubmit(){
    this.rdv.date=this.selectedDate.month+"/"+this.selectedDate.day+"/"+this.selectedDate.year+" "+this.heure+":00";
    console.log(this.rdv.date);

    this.apiRdv.addRdv(this.rdv).subscribe(
      data =>{
        console.log("Sucess!");
        this.boolRdvSuccess = true;
      },
      error =>{
        console.log("Error!");
      }
    )
  }

  ngOnInit() {
    this.idmedecin = this.route.snapshot.paramMap.get("idmedecin");
    this.apiMedecin.getMedecinById(this.idmedecin).subscribe(
      data => {
        this.medecin = data[0];

      }
    );

    if(this.authService.loggedIn()){
      this.apiClient.getClientByToken(localStorage.getItem("token")).subscribe(
        data => {
          this.client = data[0];
          this.rdv.id_client = this.client.id;
          this.rdv.id_medecin = this.idmedecin;
        }
      );
    }
    else{
      this.router.navigate(["log-in/client"]);
    }
    
  }

}
