import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { devEmpresaConfig } from '../../../_config/d/devEmpresa.config';
//import { Empresa } from '../../../_models/e/empresa.model';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


// servicios
import { UserService } from '../../../_services/u/user.service';
// Alerts
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-user-edit',
  templateUrl: './edit.component.html',
  providers: [UserService,FormsModule,ReactiveFormsModule]
  
})
export class UserEditComponent implements OnInit, AfterViewInit, OnChanges {
	public devEmpresa: string;
	public title: string;
  public userlst: string[];
  public mkid : string;
  public user: any;
  public mkEditar: boolean;
  public mkEditarID: boolean;
  public newRow: any;

  forma:  FormGroup;
  correo:  FormArray;
  formaUser:  FormGroup;
    
  constructor(
    private _userService: UserService,	
    private rutaActiva: ActivatedRoute,
    private _fb: FormBuilder,
    private _router: Router,
 


  ) { 
    this.devEmpresa = devEmpresaConfig.nombre;	
    this.title="Edit User";
    this.userlst=[];
    this.mkEditar=false;
    this.mkEditarID=true;

  }

  ngOnChanges() {
    console.log('00 Componente empresa iniciado');	
  }

  ngOnInit() {

    console.log('01 Componente empresa iniciado');

    this.createForm();
    this.mkid=this.rutaActiva.snapshot.params._id;

    if (this.mkid==='0'){
      this.title="Nuevo Usuario";
      //this.empresa = new Empresa('','','','','','',true,null,[],[]);
      this.formaUser.reset();    
      this.mkEditar=false;  
    }else {

      this._userService.user_uno(this.mkid).subscribe(
        response => {
          if (response.user){
            this.user = response.user;            
            this.title=this.user[0].surname+"-"+this.user[0].nombre;
            this.formaUser.controls['surname'].setValue(this.user[0].surname);
            this.formaUser.controls['nombre'].setValue(this.user[0].nombre);
            this.formaUser.controls['rfc'].setValue(this.user[0].rfc);
            this.formaUser.controls['grupo'].setValue(this.user[0].grupo);
            this.formaUser.controls['estatus'].setValue(this.user[0].estatus);
            //this.formaUser.controls['fechaAlta'].setValue(this.user[0].fechaAlta);
            //this.formaUser.controls['seBorra'].setValue(this.user[0].seBorra.boolean);
            //console.log(this.empresa);
            //yourDate, 'yyyyMMddhhmmss')
            //console.log(this.formaEmpresa.value);

          } else {
            console.log('error al responder');
          }
        }
      );      
    }

    //this.getEmpresaAll();	
  }
  public createForm (){
    this.formaUser = this._fb.group({
      surname : [{value: ''},Validators.required],
      nombre : [{value: ''},Validators.required],
      rfc : [{value: ''},Validators.required],
      grupo : [{value: ''},Validators.required],
      estatus :[{value: ''},Validators.required],
      //seBorra : [{value: ''},Validators.required],
      //fechaAlta :[{value: ''},Validators.required],
      domicilio: this._fb.array([
        this.getDomicilio( )
      ]),
      telefono: this._fb.array([
        this.getTelefono( )
      ])
    });
  }
  //.minLength(2)

  getDomicilio(): FormGroup {
    return this._fb.group({
      tipo: [],
      direccion: [],
      numext: [],
      numint: [],
      cp: [],
      colonia: [],
      municipio: [],
      delegacion: [],
      estado: []
    });
  }
  getTelefono(): FormGroup {
    return this._fb.group({
      tipo: [],
      numero: [],
      extension: []      
    });
  }

  ngAfterViewInit() {}

  mk_edit(){ 
    if (this.mkEditar==false)
    {
      this.mkEditar=true;
      Swal('Editar','No puede editar','error');
    } else {
      this.mkEditar=false;
      Swal('Editar','Puede Editar','success');          
    }    
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

mk_save(){
    if (this.mkid==='0'){
      this._userService.user_new(this.formaUser.value).subscribe(
        response => {
          if (response.user){    
            console.log(response.user);
            this.user = response.user;
            console.log('se guardo'); 
            Swal('Guardar...'+this.user.surname,'Se guardo Correctamente la USer','success');
            this._router.navigate(['/user/list']);
          } else {     
            console.log('error al responder');     
          }
        },
        error=>{
          var errorMessage =<any>error;
          if (errorMessage != null) {
            var mkerrores =JSON.parse(error._body);
            Swal(mkerrores.message + '...', this.devEmpresa, 'error');
          }
        }
      );
    } else {
      this._userService.user_edit(this.formaUser.value,this.mkid).subscribe(
        response => {
          if (response.user){
            //console.log(response.user);
            this.user = response.user;
            //console.log('se guardo');
            Swal('Guardar...'+this.user.surname,'Se guardo correctamente usuario','success');
            this._router.navigate(['/user/list']);
          }          
        },
        error=>{
          var errorMessage =<any>error;
          if (errorMessage != null) {
            var mkerrores =JSON.parse(error._body);
            Swal(mkerrores.message + '...', this.devEmpresa, 'error');
          }
        }        
      );
    }

  }
    

  mk_propiedades(){ Swal('Propiedades','Presionaste el botón de Propiedades','success'); }
  mk_rep(){ Swal('Reporte','Presionaste el botón de Reporte','success'); }
  mk_regresar(){    

    Swal('Reporte','Presionaste el botón de Reporte','success'); 
  }


	
	

}
