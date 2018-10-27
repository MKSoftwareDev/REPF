import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { devEmpresaConfig } from '../../../_config/d/devEmpresa.config';

//Modelo
import { Empresa } from '../../../_models/e/empresa.model';

// servicios
import { EmpresaService } from '../../../_services/e/empresa.services';
import { UserService } from '../../../_services/u/user.service';
import { MensajeService } from '../../../_services/m/mensaje.services';
// Alerts
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-empresa-add',
  templateUrl: './add.component.html',
  providers:[EmpresaService,UserService,MensajeService]
})
export class EmpresaAddComponent implements OnInit {
  public empresa: Empresa;
	public devEmpresa: string;
  public title: string;
  public empresaAdd: any;
  public message: any;
  public token: any;
  public status: string;
  public mensaje: any; 

  

    
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _empresaService:EmpresaService,
    private _userService:UserService,
    private _mensajeService:MensajeService,

  ) { 
    this.empresa = new Empresa('','','','','','',true,null);
    this.devEmpresa = devEmpresaConfig.nombre;	
    this.title="Add Empresa";
    this.mensaje= "{id:4, idioma:'esp'}";
    this.token = this._userService.getToken();

   
  }

  ngOnChanges() {
    console.log('00 Componente empresa iniciado');	
  }

  ngOnInit() {
    console.log('01 Componente empresa iniciado');

  }

  ngAfterViewInit() {
  }

  MkClickAdd(){    
    console.log(this.empresa);
    this._empresaService.empresaAdd(this.empresa).subscribe(
      response => {
        if(response.empresa){
          this.empresaAdd = response.empresa;
          //console.log(this.empresaAdd);
          Swal('Se dio de ALTA la empresa :'+this.empresaAdd.clave, this.devEmpresa, 'success');
          this._router.navigate(['empresa/list']);
          //console.log('error al responder');
        } else {
          this.message= response.message;
          Swal(this.message, this.devEmpresa, 'error');
          console.log('error al responder');
        }
      },
      error=>{
        var errorMessage =<any>error;
        if (errorMessage != null) {
          var mkerrores =JSON.parse(error._body);
          Swal(mkerrores.message + '...', this.devEmpresa, 'error');
          this.status='error';
        }
      }
    );
  }


}
