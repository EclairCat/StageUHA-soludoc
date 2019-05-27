import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Client } from '../classes/Client';

@Injectable()
export class apiClient{

    constructor(private http:HttpClient){

    }

    getClientById(id:number): Observable<any>{
        return this.http.get("http://localhost:3000/api/client/get/"+id);
    }

    addClient(c :Client):Observable<any>{
        return this.http.post("http://localhost:3000/api/client/add", c);
    }

    editClient(c :Client):Observable<any>{
        return this.http.post("http://localhost:3000/api/client/edit", c);
    }

    deleteClient(c:Client):Observable<any>{
        return this.http.post("http://localhost:3000/api/client/delete",c);
    }

    loginClient(email:string, mdp:string):Observable<any>{
        return this.http.get("http://localhost:3000/api/client/loging/"+email+"/"+mdp);
    }
    
    
}