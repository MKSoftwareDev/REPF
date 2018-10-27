import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { devEmpresaConfig } from '../../../_config/d/devEmpresa.config';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//Modelo
import { People } from '../../../_models/p/people.model';

//servicios
import { PeopleService } from '../../../_services/p/people.services';
import { UserService } from '../../../_services/u/user.service';
import { MensajeService } from '../../../_services/m/mensaje.services';

//Alerts
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-edit-people',
  templateUrl: './edit.people.component.html',
  providers:[PeopleService,UserService,MensajeService,ReactiveFormsModule,FormsModule]
})
export class PeopleEditComponent implements OnInit {
  public people: People;
  public devEmpresa: string;
  public title: string;
  public peopleAdd: any;
  public message: any;
  public token: any;
  public status: string;
  public mensaje: any; 
  forma: FormGroup;

      
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _peopleService:PeopleService,
    private _userService:UserService,
    private _mensajeService:MensajeService

  ) { 
    this.people = new People('','','','','','','',true,[],[],[],null,null,'','');
    this.devEmpresa = devEmpresaConfig.nombre;	
    this.title="Edicion RUR";
    this.mensaje= "{id:4, idioma:'esp'}";
    this.token = this._userService.getToken();

    this.forma = new FormGroup({        
      'a': new FormControl('', Validators.required)
      // 'nombre':    new FormControl(),
      // 'apellido':  new FormControl(),
      // 'sapellido': new FormControl(),
      //'RFC':       new FormControl('')
      // 'genero':    new FormControl(),
      // 'esPEP':     new FormControl(),
      // 'domicilio': new FormGroup({
      //     'tipo':       new FormControl(),
      //     'direccion':  new FormControl(),
      //     'numext':     new FormControl(),
      //     'numint':     new FormControl(),
      //     'cp':         new FormControl(),
      //     'colonia':    new FormControl(),
      //     'municipio':  new FormControl(),
      //     'delegacion': new FormControl(),
      //     'estado':     new FormControl(),
      // }),
      // 'telefono':   new FormGroup({
      //     'tipo':       new FormControl(),
      //     'numero':     new FormControl(),
      //     'extension':  new FormControl(),
      // }),        
      // 'correo': new FormGroup({
      //     'tipo':   new FormControl(),
      //     'email':  new FormControl(),            
      // }),  
      // 'nacionalidad': new FormGroup({
      //     'tipo':           new FormControl(),
      //     'nacionalidad':   new FormControl(),            
      // }),      
      // 'fechaCreacion':  new FormControl(),        
      // 'fechaactualizacion':  new FormControl(),
      // 'estatus':  new FormControl(),
      // '_usuario':  new FormControl()
    })  
    
   
  }

  ngOnChanges() {
    console.log('00 Componente people iniciado');	
  }

  ngOnInit() {
    console.log('01 Componente people iniciado');



  }

  ngAfterViewInit() {
  }

  MK_people_click(){
      console.log(this.forma.value);
      console.log(this.forma);
   }

  MK_people_add_click(){    

    this._peopleService.people_ServNuevo(this.people).subscribe(
      response => {
        if(response.empresa){
          this.peopleAdd = response.empresa;
          //console.log(this.empresaAdd);
          Swal('Se dio de ALTA la empresa :'+this.peopleAdd.clave, this.devEmpresa, 'success');
          this._router.navigate(['people']);
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
