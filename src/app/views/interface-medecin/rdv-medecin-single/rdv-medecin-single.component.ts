import { Component, OnInit, Input } from '@angular/core';
import { Rdv } from 'src/app/classes/Rdv';
import { Client } from 'src/app/classes/Client';
import { Medecin } from 'src/app/classes/Medecin';
import { apiMedecin } from 'src/app/services/apiMedecin.service';
import { apiClient } from 'src/app/services/apiClient.service';
import { apiRdv } from 'src/app/services/apiRdv.service';
import { Router } from '@angular/router';

import { RdvMedecinComponent } from '../rdv-medecin/rdv-medecin.component';

@Component({
  selector: 'app-rdv-medecin-single',
  templateUrl: './rdv-medecin-single.component.html',
  styleUrls: ['./rdv-medecin-single.component.css']
})
export class RdvMedecinSingleComponent implements OnInit {

  constructor(private apiMedecin: apiMedecin, private apiClient: apiClient, private apiRdv: apiRdv, private router : Router, private RdvMedecinComponent : RdvMedecinComponent ) { }

  @Input() rdv : Rdv;
  client = new Client;
  medecin = new Medecin;

  
  ngOnInit() {
    this.apiMedecin.getMedecinById(this.rdv.id_medecin).subscribe(
      data => {
        this.medecin = data[0];
      },
      error => {
        console.log(error);
      }
    );

    this.apiClient.getClientById(this.rdv.id_client).subscribe(
      data => {
        this.client = data[0];
      },
      error => {
        console.log(error);
      }
    );
  }

  allowCancelRdv = false;
  cancelRdv(){
    if(this.allowCancelRdv){
      this.apiRdv.deleteRdv(this.rdv).subscribe(
        data=>{
          console.log("Rdv Deleted");
        }
      );
      this.RdvMedecinComponent.reloadData();
    }
    else{
      this.allowCancelRdv = true;
    }
  }

  confirmRdv(){
    this.apiRdv.confirmRdv(this.rdv).subscribe(
      data =>{
        console.log("Rdv Confirmer");
      }
    );
    this.RdvMedecinComponent.reloadData();
  }


}
