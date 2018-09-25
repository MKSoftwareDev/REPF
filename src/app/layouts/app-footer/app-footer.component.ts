import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../_services/serv.mk';
import { devEmpresaConfig } from '../../_config/d/devEmpresa.config';

@Component({
  selector: '[app-footer]',
  templateUrl: './app-footer.component.html',
  providers: [ConfigService]
})
export class AppFooter implements OnInit {
  // variables
  public empNombre: string;
  public empresa: string;
  public sucursal: string;
  public sucNombre: string;
  public devEmpresa: string;
  public devEmpLink: string;
  public devEmpFrace: string;
  public fechaTrabajo: string;
  public anio: number;
  public empiniciales: string;
  public emplink: string;
  public empfrase: string;
  public empcorreoinfo: string;



  constructor ( private _configServices: ConfigService )
  {
   this.anio = (new Date).getFullYear();
   this.devEmpresa = devEmpresaConfig.nombre;
   this.devEmpLink = devEmpresaConfig.url;
   this.devEmpFrace = devEmpresaConfig.frace;
  }

  ngOnInit () {    
    if ((localStorage.identity !== undefined)) {
      this.empresa = localStorage.getItem('loginEmpresa');
      this.fechaTrabajo = localStorage.getItem('loginFechaTrabajo');
      this.sucursal = localStorage.getItem('loginSucursal');

    } else {
      console.log('footer no se encontro localStorage.nombre');
    }
      
  }



}


