import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Rdv } from '../classes/Rdv';

@Injectable()
export class apiRdv{

    constructor(private http:HttpClient){

    }

    getRdvMedecin(id_medecin:number): Observable<any>{
        return this.http.get("http://localhost:3000/api/rdv/getRdvMedecin/"+id_medecin);
    }

    getRdvClient(id_client:number):Observable<any>{
        return this.http.get("http://localhost:3000/api/rdv/getRdvClient/"+id_client);
    }

    addRdv(rdv: Rdv):Observable<any>{
        return this.http.post("http://localhost:3000/api/rdv/add",rdv);
    }

    editRdv(rdv: Rdv):Observable<any>{
        return this.http.post("http://localhost:3000/api/rdv/edit",rdv);
    }

    deleteRdv(rdv: Rdv):Observable<any>{
        return this.http.post("http://localhost:3000/api/rdv/delete",rdv);
    }
    
    
}