import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { devEmpresaConfig } from '../../../_config/d/devEmpresa.config';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

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
  providers:[PeopleService,UserService,MensajeService,FormsModule,ReactiveFormsModule]
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
  
  public telefonos: Array<Object>;
  public correos: Array<Object>;
  public newRow: boolean;
  forma:  FormGroup;
  correo:  FormArray;


      
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _peopleService:PeopleService,
    private _userService:UserService,
    private _mensajeService:MensajeService,
    private _fb: FormBuilder,

  ) { 
    this.people = new People('','','','','','','',true,[],[],[],null,null,'','');
    this.devEmpresa = devEmpresaConfig.nombre;	
    this.title="Edicion RUR";
    this.mensaje= "{id:4, idioma:'esp'}";
    this.token = this._userService.getToken();
    this.telefonos=[{tipo:'Celular',numero:'(52) 55 4765 1233',extension:''},
                   {tipo:'Casa', numero:'(52) 55 57302122',extension:''},
                   {tipo:'Oficina', numero:'(52) 55 57302122',extension:'487'}];
    this.correos=[{tipo:'Personal',email:'nestory800@gmail.com'},
                   {tipo:'Trabajo', email:'hrosales@mksoftwaredev.com'}];                   
    this.newRow=false;
  }
    ngOnInit() {
      this.createForm();

    };

  public createForm (){
    this.forma = this._fb.group({
      clave : [],
      nombre: [],
      apellido: [],
      sapellido: [],
      RFC:  [],
      CURP: [],
      genero: [],
      esPEP:  [],
      correo: this._fb.array([
        this.getCorreo( )
      ])
    });
  }

  getCorreo(): FormGroup {
    return this._fb.group({
      tipo: [],
      email:[]
    });
  }


  // add new row
addCorreo() {

  this.correo = this.forma.get('correo') as FormArray;
  this.correo.push(this.getCorreo());
  this.newRow=false;
}

// remove row
removeCorreo(i: number) {
  const control = <FormArray>this.forma.controls['correo'];
  control.removeAt(i);
}

  showData(){
    console.log(this.forma.value);
  }

  MK_people_click(){
    console.log(this.forma.value);
  }
  
  get formCorreo() { return <FormArray>this.forma.get('correo'); }
}
