import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Medecin } from '../classes/Medecin';

@Injectable()
export class apiMedecin{

    constructor(private http:HttpClient){

    }

    getAllMedecin(): Observable<any>{
        return this.http.get("http://localhost:3000/api/medecin/getAll");
    }

    getMedecinById(id:number): Observable<any>{
        return this.http.get("http://localhost:3000/api/medecin/get/"+id);
    }


    addMedecin(m: Medecin): Observable<any>{
        return this.http.post("http://localhost:3000/api/medecin/add", m);
    }
    
    editMedecin(m:Medecin): Observable<any>{
        return this.http.post("http://localhost:3000/api/medecin/edit",m);
    }

    removeMedecin(m: Medecin): Observable<any>{
        return this.http.post("http://localhost:3000/api/medecin/delete",m);
    }

    loginMedecin(email:string , mdp: string): Observable<any>{
        return this.http.get("http://localhost:3000/api/medecin/login/"+email+"/"+mdp);
    }
    
}