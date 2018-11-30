import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
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

    sucursal_test () {
        return "sucursal prueba de servicio ";
    }
    sucursal_new(sucursal){
        let params =JSON.stringify(sucursal); 
        let headers = new Headers({
              'Content-Type': 'application/json'
        });
        return this._http.post(this.url+'/sucursal/new',params,{headers:headers}).map(
            res=>res.json()
            );
    }
	sucursal_edit(sucursal,_id){   
        let mkid = _id;  
        let params=JSON.stringify(sucursal);           
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.put(this.url+'/sucursal/'+mkid,params, {headers:headers}).map(
            res=>res.json()        
            );
    } 
	sucursal_list(){               
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.get(this.url+'/sucursal', {headers:headers}).map(
            res=>res.json()        
            ); 
    }
	sucursal_delete(_id){  
        let mkid=_id;             
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.delete(this.url+'/sucursal/'+mkid, {headers:headers}).map(
            res=>res.json()        
            );
    }    
	sucursal_uno(_id){  
        let mkid=_id; 
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.get(this.url+'/sucursal/'+mkid, {headers:headers}).map(
            res=>res.json()        
            );
   }      

}
