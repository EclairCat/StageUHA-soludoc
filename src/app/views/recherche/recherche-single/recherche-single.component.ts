import { Component, OnInit, Input } from '@angular/core';
import { Medecin } from 'src/app/classes/Medecin';
import { apiSpecialite } from 'src/app/services/apiSpecialiter.service';
import { Specialite } from 'src/app/classes/Specialite';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche-single',
  templateUrl: './recherche-single.component.html',
  styleUrls: ['./recherche-single.component.css']
})
export class RechercheSingleComponent implements OnInit {

  constructor(private apiSpecialite: apiSpecialite, private route: Router) { }

  @Input() medecin : Medecin;  

  ngOnInit() {
    
  }


  navToMedecin(){
    this.route.navigate(["/medecin/"+this.medecin.id]);
  }

  navToRdvMedecin(){
    this.route.navigate(["/prendreRdv/"+this.medecin.id]);
  }
}
