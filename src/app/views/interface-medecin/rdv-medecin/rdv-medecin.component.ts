import { Component, OnInit } from '@angular/core';
import { apiRdv } from 'src/app/services/apiRdv.service';
import { Rdv } from 'src/app/classes/Rdv';

@Component({
  selector: 'app-rdv-medecin',
  templateUrl: './rdv-medecin.component.html',
  styleUrls: ['./rdv-medecin.component.css']
})
export class RdvMedecinComponent implements OnInit {

  constructor(private apiRdv: apiRdv) { }

  listRdv: Rdv[];
  listRdvConfirmer: Rdv[] = [];
  listRdvEnAttente: Rdv[] = [];

  type = localStorage.getItem('type');
 
  //recharge les donées
  reloadData() {
    this.listRdvConfirmer = [];
    this.listRdvEnAttente = [];

    this.apiRdv.getRdvMedecin(localStorage.getItem('token')).subscribe(
      data => {
        this.listRdv = data;
        this.listRdv.forEach(rdv => {
          if (rdv.confirmation == "Confirmer") {
            this.listRdvConfirmer.push(rdv);
          }
          else {
            this.listRdvEnAttente.push(rdv);
          }
        })
      }
    )
  }

  ngOnInit() {
    if (this.type != '0') {
      this.reloadData();
    }
  }

}
