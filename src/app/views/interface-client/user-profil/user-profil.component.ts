import { Component, OnInit } from '@angular/core';
import { apiClient } from '../../../services/apiClient.service';
import { Client } from '../../../classes/Client';
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

  ancien_mdp : string;
  ancien_mdp_false = false;

  ngOnInit() {
    this.apiClient.getClientByToken(localStorage.getItem('token')).subscribe(
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

  changeMdp(){
    console.log("test");
    if(this.ancien_mdp == null || this.ancien_mdp == undefined){
      this.ancien_mdp_false = true;
    }
    else{
      this.router.navigate(["/newPassword"]);
    }
  }

  onSubmit() {
    this.apiClient.editClient(this.clientModel).subscribe(
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
