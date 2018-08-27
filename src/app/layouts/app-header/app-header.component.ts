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
  public empiniciales: string;
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
    //console.log(this._configServices.configServiceTest);
    this.getCfgData();
    //console.log(this.arrCfg);
  }

  
  getCfgData(){
    this._configServices.getConfig().subscribe(
      response => {
        if (response.cfg) {
          //this.arrCfg = response.cfg;
          this.empresa = response.cfg.empresa.nombre;
          this.empiniciales = response.cfg.empresa.iniciales;
          //console.log(this.arrCfg[0].empresa.nombre);
        } else {
          console.log('vacio');
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
