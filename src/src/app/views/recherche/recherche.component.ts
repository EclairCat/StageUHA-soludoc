import { Component, OnInit } from '@angular/core';

//Classes
import { Medecin } from '../../classes/Medecin';
import { Specialite } from '../../classes/Specialite';

//Services
import {apiMedecin } from '../../services/apiMedecin.service';
import {apiSpecialite} from '../../services/apiSpecialiter.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {

  constructor(private apiMedecin : apiMedecin, private apiSpecialite: apiSpecialite) { 

  }

  listMedecin: Medecin[]; //Liste des Medecins
  listSpe: Specialite[]; //Liste des Specialites
  // listMedecinHasSpe :  //Liste Medecin + specialite

  ngOnInit() {

    this.apiMedecin.getAllMedecin().subscribe(
      data => {
        this.listMedecin = data;
      }
    )

    this.apiSpecialite.getSpecialite().subscribe(
      data => {
        this.listSpe = data;
      }
    )

  }

}
