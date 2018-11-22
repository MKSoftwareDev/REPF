import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { devEmpresaConfig } from '../../_config/d/devEmpresa.config';

@Injectable()


export class PeopleService {
    public url: string;
    public identity: string;
    public token: string;

    constructor( private _http: Http){
        this.url = devEmpresaConfig.BackendUrl;

    }

    people_test () {
        return "people prueba de servicio";
    }
	people_list(){               
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.get(this.url+'/people', {headers:headers}).map(res=>res.json());
    }
    people_uno(people){  
        let params =JSON.stringify(people);              
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.get(this.url+'/people', {headers:headers}).map(res=>res.json());
    }
    people_edit(people){  
        let params =JSON.stringify(people);              
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.get(this.url+'/people', {headers:headers}).map(res=>res.json());
    }
    people_delete(people){
        let params =JSON.stringify(people); 
        let headers = new Headers({'Content-Type': 'application/json'});
        return this._http.post(this.url+'/people/new',params,{headers:headers}).map(res=>res.json());
    }    
}


