import { Injectable } from "@angular/core";

@Injectable()
export class authService{

    ifMedecin = false;
    ifClient = false;
    ifSecretaire = false;

    //Renvoie true si l'utilisateur est Client
    logClient(){
        return this.ifClient;
    }

    //Renvoie true si l'utilisateur est Medecin
    logMedecin(){
        return this.ifMedecin;
    }

    //Renvoie true si l'utilisateur est Secretaire
    logSecretaire(){
        return this.ifSecretaire;
    }

    loggedIn(){
        return !!localStorage.getItem('token');
    }

    getToken(){
        return localStorage.getItem('token');
    }

    //Deconnecte l'utilisateur
    logOut(){
        this.ifMedecin = false;
        this.ifClient = false;
        this.ifSecretaire = false;
        localStorage.removeItem('token');
    }

}