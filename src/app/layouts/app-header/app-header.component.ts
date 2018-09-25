import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ConfigService } from '../../_services/serv.mk';
import { config } from '../../../assets/global/config';

@Component({
  selector: '[app-header]',
  templateUrl: './app-header.component.html',
  providers: [ConfigService]
})
export class AppHeader implements OnInit, AfterViewInit {
  public empresa: string;
  public sucursal: string;
  public fechaTrabajo : string;
  public usuario : string;
  //public arrCfg: string[];

constructor (
  private _configServices: ConfigService
) {
//this.empnombre = config.EmpNombre;
//this.empiniciales = config.EmpIniciales;

}
  ngAfterViewInit()  {
  }
  
  
  ngOnInit () {

    var i;

    console.log("local storage");
    for (i = 0; i < localStorage.length; i++)   {
        console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
    }
    
    console.log("session storage");
    for (i = 0; i < sessionStorage.length; i++) {
        console.log(sessionStorage.key(i) + "=[" + sessionStorage.getItem(sessionStorage.key(i)) + "]");
    }

    if ((localStorage.identity !== undefined)) {
      this.empresa = localStorage.getItem('loginEmpresa');
      this.fechaTrabajo = localStorage.getItem('loginFechaTrabajo');
      this.sucursal = localStorage.getItem('loginSucursal');
      this.usuario = localStorage.getItem('identity[0].surname');

    } else {
      console.log('footer no se encontro localStorage.nombre');
    }
  }

  


}
