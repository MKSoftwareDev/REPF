import { Component, OnInit } from '@angular/core';
import { devEmpresaConfig } from '../../../_config/d/devEmpresa.config';

// servicios
import { SucursalService } from '../../../_services/s/sucursal.service';
// Alerts
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-addsucursal',
  templateUrl: './add.component.html',
	providers: [SucursalService]
})

export class AddSucursalComponent implements OnInit {
	public devEmpresa: string;
	public title: string;
  public sucursallst: string[];
  public langs: string[];
    
  constructor(
    private _sucursalService: SucursalService


  ) { 
    this.langs = [
      'English',
      'French',
      'German',
    ]

  }

  ngOnInit(){
    console.log('01 Componente Add Sucursal iniciado');
  }

  addformclick_sucursal(){
    
  }





}
