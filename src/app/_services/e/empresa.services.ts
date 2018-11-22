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

    empresa_test () {
        return "empresa prueba de servicio ";
    }
    empresa_new(empresa){
        let params =JSON.stringify(empresa); 
        let headers = new Headers({
              'Content-Type': 'application/json'
        });
        return this._http.post(this.url+'/empresa/new',params,{headers:headers}).map(
            res=>res.json()
            );
    }
	empresa_edit(empresa,_id){   
        let mkid = _id;  
        let params=JSON.stringify(empresa);           
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.put(this.url+'/empresa/'+mkid,params, {headers:headers}).map(
            res=>res.json()        
            );
    } 
	empresa_list(){               
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.get(this.url+'/empresa', {headers:headers}).map(
            res=>res.json()        
            ); 
    }
	empresa_delete(_id){  
        let mkid=_id;             
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.delete(this.url+'/empresa/'+mkid, {headers:headers}).map(
            res=>res.json()        
            );
    }    
	empresa_uno(_id){  
        let mkid=_id; 
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.get(this.url+'/empresa/'+mkid, {headers:headers}).map(
            res=>res.json()        
            );
   }      

}
