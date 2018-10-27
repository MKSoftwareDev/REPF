import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { devEmpresaConfig } from '../../_config/d/devEmpresa.config';


import 'rxjs/add/operator/catch';
@Injectable()


export class MensajeService {
    public url: string;
    public identity: string;
    public token: string;

    constructor( private _http: Http){
        this.url = devEmpresaConfig.BackendUrl;

    }
    unMensaje(mensaje){
        let params =JSON.stringify(mensaje); 
        let headers = new Headers({
              'Content-Type': 'application/json'
        });
        return this._http.get(this.url+'mensaje',{headers:headers}).map(res=>res.json());
    }   
}

