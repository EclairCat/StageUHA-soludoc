import { Component, OnInit } from '@angular/core';
import { Medecin } from 'src/app/classes/Medecin';
import { ActivatedRoute,  Router } from '@angular/router';
import { apiMedecin } from 'src/app/services/apiMedecin.service';

@Component({
  selector: 'app-medecin-cabinet',
  templateUrl: './medecin-cabinet.component.html',
  styleUrls: ['./medecin-cabinet.component.css']
})
export class MedecinCabinetComponent implements OnInit {

  constructor(private route : ActivatedRoute, private apiMedecin: apiMedecin, private router :Router) { }

  medecinModel = new Medecin;
  id; 

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.apiMedecin.getMedecinById(this.id).subscribe(
      data => {
        this.medecinModel = data[0];
      }
    )
  }

  navToRdvMedecin(){
    this.router.navigate(["/prendreRdv/"+this.medecinModel.id]);
  }

}
