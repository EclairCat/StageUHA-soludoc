import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Secretaire } from '../classes/Secretaire';

@Injectable()
export class apiSecretaire{

    constructor(private http:HttpClient){

    }

    addSecretaire(s:Secretaire): Observable<any>{
        return this.http.post("http://localhost:3000/api/secretaire/add", s);
    }

    deleteSecretaire(s:Secretaire):Observable<any>{
        return this.http.post("http://localhost:3000/api/secretaire/edit",s);
    }

    editSecretaire(s:Secretaire):Observable<any>{
        return this.http.post("http://localhost:3000/api/secretaire/delete",s);
    }
    
    
}