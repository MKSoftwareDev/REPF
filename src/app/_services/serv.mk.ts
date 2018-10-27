import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { config } from '../../assets/global/config';


@Injectable()


export class ConfigService {
    public url: string;
    public identity: string;
    public token: string;

    constructor( private _http: Http){
        this.url = config.BackendUrl;

    }

    configServiceTest () {
        return "Esta es una prueba del servicio";
    }



	getConfig(){      
        
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.get(this.url+'cfg', {headers:headers}).map(res=>res.json());

    }



}
