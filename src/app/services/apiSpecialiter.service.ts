import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class apiSpecialite{

    constructor(private http:HttpClient){

    }

    getSpecialite(): Observable<any>{
        return this.http.get("http://localhost:3000/api/specialite/getAll");
    }

    getSpecialiteById(id:number):Observable<any>{
        return this.http.get("http://localhost:3000/api/specialite/get/"+id);
    }
    
    
}