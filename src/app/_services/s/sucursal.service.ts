import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { devEmpresaConfig } from '../../_config/d/devEmpresa.config';


@Injectable()


export class SucursalService {
    public url: string;
    public identity: string;
    public token: string;

    constructor( private _http: Http){
        this.url = devEmpresaConfig.BackendUrl;

    }

    sucursalServiceTest () {
        return "sucursal prueba de servicio ";
    }



	sucursalesAll(){       
        
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.get(this.url+'/sucursal', {headers:headers}).map(res=>res.json());

    }



}
