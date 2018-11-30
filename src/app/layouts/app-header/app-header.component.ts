import { Component,  OnInit } from '@angular/core';

//Configuracion
import { devEmpresaConfig } from '../../_config/d/devEmpresa.config';
//Servicios
import { UserService } from '../../_services/u/user.service';

@Component({
  selector: '[app-header]',
  templateUrl: './app-header.component.html',
  providers: [UserService]
})
export class AppHeader implements OnInit {
  public identity: any;
  public login: any;
  public empresa: string;
  public sucursal: string;
  public fechaTrabajo : string;
  public usuario : string;
  public database : string;
  public backend : string;

constructor ( 
  private _userService: UserService ) {
    this.backend=devEmpresaConfig.backend;
    this.database=devEmpresaConfig.database;

}

  ngOnInit () {
    this.login = JSON.parse(this._userService.getLogin());
    this.identity = this._userService.getIdentity();

    if (this.identity!==null && this.identity!==undefined && this.identity.nombre!==undefined) {
      this.empresa = this.login.empresa;
      this.fechaTrabajo = this.login.fecha;
      this.sucursal = this.login.sucursal;
      this.usuario = this.identity.nombre +' '+ this.identity.paterno;
    } else {

      console.log('header no se encontro localStorage.nombre');

    }

  }

  


}
