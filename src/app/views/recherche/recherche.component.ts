import { Component, OnInit } from '@angular/core';

//Classes
import { Medecin } from '../../classes/Medecin';
import { Specialite } from '../../classes/Specialite';

//Services
import { apiMedecin } from '../../services/apiMedecin.service';
import { apiSpecialite } from '../../services/apiSpecialiter.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {

  constructor(private apiMedecin: apiMedecin, private apiSpecialite: apiSpecialite) {

  }

  medecinModel = new Medecin;
  listMedecin: Medecin[]; //Liste des Medecins
  listMedecinCritere: Medecin[] = []; //Liste des Medecins rechercher sous critère

  listSpe: Specialite[]; //Liste des Specialites

  afficherListRecherche = false; //Boolean qui change le type de liste a afficher
  resultNotfound = false;
  // listMedecinHasSpe :  //Liste Medecin + specialite

  ngOnInit() {

    this.apiMedecin.getAllMedecin().subscribe(
      data => {
        this.listMedecin = data;
      }
    );


    this.apiSpecialite.getSpecialite().subscribe(
      data => {
        this.listSpe = data;
      }
    )

  }



  recherche() {
    console.log(this.medecinModel);
    //Reset de la Liste
    this.listMedecinCritere = [];

    //Comparaison pour chaque medecin
    this.listMedecin.forEach(medecin => {
      //Nom
      if (this.medecinModel.nom != " " && this.medecinModel.nom != undefined) {
        if (medecin.nom.toUpperCase() == this.medecinModel.nom.toUpperCase()) {
          this.listMedecinCritere.push(medecin);
          return;
        }
      }
      //Prenom
      if (this.medecinModel.prenom != " " && this.medecinModel.prenom != undefined) {
        if (medecin.prenom.toUpperCase() == this.medecinModel.prenom.toUpperCase()) {
          this.listMedecinCritere.push(medecin);
          return;
        }
      }
      //Specialite
      if (this.medecinModel.specialite != null && this.medecinModel.specialite != undefined) {
        if (medecin.specialite.toUpperCase().includes(this.medecinModel.specialite.toUpperCase())) {
          this.listMedecinCritere.push(medecin);
          return;
        }
      }
      //Ville
      if (this.medecinModel.ville != " " && this.medecinModel.ville != undefined) {
        if (medecin.ville.toUpperCase() == this.medecinModel.ville.toUpperCase()) {
          this.listMedecinCritere.push(medecin);
          return;
        }
      }
    }) //Fin Du Each

    if(this.listMedecinCritere.length !=0)
    {
      this.afficherListRecherche = true;
      this.resultNotfound = false;

    }
    else{
      this.resultNotfound = true;
      this.afficherListRecherche = false;

    }
  }
}


