import { Component, OnInit } from '@angular/core';
import { Medecin } from 'src/app/classes/Medecin';
import { apiMedecin } from 'src/app/services/apiMedecin.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-medecin-profil',
  templateUrl: './medecin-profil.component.html',
  styleUrls: ['./medecin-profil.component.css']
})
export class MedecinProfilComponent implements OnInit {

  constructor(private apiMedecin: apiMedecin,
    private router: Router) { }

  medecinModel = new Medecin;

  ancien_mdp : string;
  ancien_mdp_false = false;

  editSubmit = 0;

  changeMdp(){
    console.log("test");
    if(this.ancien_mdp == null || this.ancien_mdp == undefined){
      this.ancien_mdp_false = true;
    }
    else{
      this.router.navigate(["/newPassword"]);
    }
  }


  ngOnInit() {
    this.apiMedecin.getMedecinByToken(localStorage.getItem('token')).subscribe(
      data => {
        this.medecinModel = data[0];
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

  onSubmit() {
    this.apiMedecin.editMedecin(this.medecinModel).subscribe(
      data => {
        console.log("success!", data);
        this.editSubmit = 1;
      },
      error => {
        console.log("Error! ", error);
        this.editSubmit = 2;
      }
    ); 
  }

}
