import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { devEmpresaConfig } from '../../_config/d/devEmpresa.config';

@Injectable()


export class EmpresaService {
    public url: string;
    public identity: string;
    public token: string;

    constructor( private _http: Http){
        this.url = devEmpresaConfig.BackendUrl;

    }

    empresaServiceTest () {
        return "empresa prueba de servicio ";
    }
	empresasAll(){               
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.get(this.url+'empresa', {headers:headers}).map(res=>res.json());

    }
    empresaAdd(empresa){

        let params =JSON.stringify(empresa); 
        let headers = new Headers({
              'Content-Type': 'application/json'
        });
        return this._http.post(this.url+'empresanew',params,{headers:headers}).map(res=>res.json());
    }


    
}
