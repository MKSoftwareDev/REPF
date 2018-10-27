import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs/Observable';
import { devEmpresaConfig } from '../../_config/d/devEmpresa.config';


@Injectable()

export class UserService{
	public url: string;
	public identity;
	public token;
	public login;
	constructor( private _http:Http){
	this.url = devEmpresaConfig.BackendUrl;
	}

	getTest(){
		return "Prueba user services";

	}

	signup(user_to_login,gettoken=null){
 		//console.log(this.user);
 		if(gettoken!=null){
 			user_to_login.gettoken=gettoken;
 		}
 		let params=JSON.stringify(user_to_login);
 		let headers = new Headers({'Content-Type':'application/json'});

 		return this._http.post(this.url+'login', params ,{headers:headers}).map(res=>res.json(
			
		 ));
 	}

 	getIdentity(){
 		let identity=JSON.parse(localStorage.getItem('identity'));
 		if (identity != "undefined") {
 			this.identity=identity;
 		}else{
 			this.identity=null;
 		}
 		return this.identity;
 	}

 	getToken(){
 		let token=localStorage.getItem('token');
 		if (token !="undefined") {
 			this.token=token;
 		}else{
 			this.token=null;
 		}
 		return this.token;
	 }
	 
	getLogin(){
 		let login=localStorage.getItem('login');
 		if (login !="undefined") {
 			this.login=login;
 		}else{
 			this.login=null;
 		}
 		return this.login;
 	}

}
