import { Component, OnInit } from '@angular/core';

//configuracion
import { devEmpresaConfig } from '../../_config/d/devEmpresa.config';

//servicios
import { UserService} from '../../_services/u/user.service';
import { ConfigService } from '../../_services/serv.mk';

@Component({
  selector: '[app-footer]',
  templateUrl: './app-footer.component.html',
  providers: [ConfigService,UserService]
})
export class AppFooter implements OnInit {
  public usuario: string;
  public empresa: string;
  public sucursal: string;
  public devEmpresa: string;
  public devEmpLink: string;
  public devEmpFrace: string;
  public fechaTrabajo: string;
  public anio: number;
  public login: any;



  constructor ( 
    private _configServices: ConfigService,
    private _userService: UserService
  )
  {
    this.anio = (new Date).getFullYear();
    this.devEmpresa = devEmpresaConfig.nombre;
    this.devEmpLink = devEmpresaConfig.url;
    this.devEmpFrace = devEmpresaConfig.frace;
    this.login=JSON.parse(this._userService.getLogin());
  }

  ngOnInit () {    
    if ((localStorage.identity !== undefined)) {
      this.usuario=this.login.usuario;
      this.empresa = this.login.empresa;
      this.fechaTrabajo = this.login.fecha;
      this.sucursal = this.login.sucursal;
    } else {
      console.log('footer no se encontro localStorage.nombre');
    }

  }



}


