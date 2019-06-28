import { Component, OnInit } from '@angular/core';
import { apiMedecin } from 'src/app/services/apiMedecin.service';
import { Medecin } from 'src/app/classes/Medecin';
import { authService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit {

  constructor(private apiMedecin: apiMedecin, private authService: authService) { }

  medecinModel = new Medecin;

  ngOnInit() {
    if(this.authService.isMedecin && this.authService.loggedIn){
      this.apiMedecin.getMedecinByToken(this.authService.getToken()).subscribe(
        data => {
          this.medecinModel= data[0];
        }
      )
    }
  }

}
