import { Injectable } from "@angular/core";

@Injectable()
export class authService{

    //Renvoie true si l'utilisateur est Client
    isClient(){
        return !!(localStorage.getItem('type')=='0')        
    }

    //Connecte l'utilisateur en tant que Client
    logClient(){
        localStorage.setItem('type', '0');
    }

    //Renvoie true si l'utilisateur est Medecin
    isMedecin(){
        return !!(localStorage.getItem('type')=='1')       
    }

    //Connecte l'utilisateur en tant que Medecin
    logMedecin(){
        localStorage.setItem('type', '1');
    }

    //Renvoie true si l'utilisateur est Secretaire
    isSecretaire(){
        return !!(localStorage.getItem('type')=='2')       
    }

    //Connecte l'utilisateur en tant que Secretaire
    logSecretaire(){
        localStorage.setItem('type', '2');
    }

    //Verifie si le token est present
    loggedIn(){
        return !!localStorage.getItem('token');
    }

    //Renvoie le token 
    getToken(){
        return localStorage.getItem('token');
    }

    //Deconnecte l'utilisateur
    logOut(){
        localStorage.removeItem('type');
        localStorage.removeItem('token');
    }

}