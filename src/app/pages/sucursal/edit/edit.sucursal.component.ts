import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { devEmpresaConfig } from '../../../_config/d/devEmpresa.config';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


// servicios
import { SucursalService } from '../../../_services/s/sucursal.service';
import { EmpresaService } from '../../../_services/e/empresa.services';
import { UserService } from '../../../_services/u/user.service';
// Alerts
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-sucursal-edit',
  templateUrl: './edit.sucursal.component.html',
  providers: [UserService,EmpresaService,SucursalService,FormsModule,ReactiveFormsModule]
  
})
export class SucursalEditComponent implements OnInit, AfterViewInit, OnChanges {
	public devEmpresa: string;
	public title: string;
  public sucursallst: string[];
  public mkid : string;
  public sucursal: any;
  public mkEditar: boolean;
  public mkEditarID: boolean;
  public login :any;
  public usuario :string;
  public empresalst: any;
  public hoy: Date;


  formaSucursal:  FormGroup;
    
  constructor(
    private _sucursalService: SucursalService,	
    private _empresaService: EmpresaService,
    private _userService: UserService,
    private rutaActiva: ActivatedRoute,
    private _fb: FormBuilder,
    private _router: Router,
    


  ) { 
    this.devEmpresa = devEmpresaConfig.nombre;	
    this.title="Edit Sucursal";
    this.sucursallst=[];
    this.mkEditar=false;
    this.mkEditarID=true;
    this.usuario="HROSALES";    
    this.login=JSON.parse(this._userService.getLogin());
    this.hoy= new Date();

  }

  ngOnChanges() {
    console.log('00 Componente sucursal iniciado');	
  }

  ngOnInit() {
    
    this.getEmpresaAll()
    console.log('01 Componente sucursal iniciado');

    this.createForm();
    this.mkid=this.rutaActiva.snapshot.params._id;

    if (this.mkid==='0'){
      this.title="Nueva Sucursal";      
      this.formaSucursal.reset();    
      this.mkEditar=false;  
    }else {

      this._sucursalService.sucursal_uno(this.mkid).subscribe(
        response => {
          if (response.sucursal){
            this.sucursal = response.sucursal;            
            this.title=this.sucursal[0].clave+"-"+this.sucursal[0].nombre;
            this.formaSucursal.controls['clave'].setValue(this.sucursal[0].clave);
            this.formaSucursal.controls['nombre'].setValue(this.sucursal[0].nombre);
            this.formaSucursal.controls['rfc'].setValue(this.sucursal[0].rfc);
            this.formaSucursal.controls['empresa'].setValue(this.sucursal[0].empresa);
            this.formaSucursal.controls['grupo'].setValue(this.sucursal[0].grupo);
            this.formaSucursal.controls['estatus'].setValue(this.sucursal[0].estatus);                       
            this.formaSucursal.controls['seBorra'].setValue(this.sucursal[0].seBorra);


          } else {
            console.log('error al responder');
          }
        }
      );      
    }

    //this.getEmpresaAll();	
  }

  public createForm (){
    this.formaSucursal = this._fb.group({
      clave : [{value: ''},Validators.required],
      nombre : [{value: ''},Validators.required],
      rfc : [{value: ''},Validators.required],
      empresa : [{value: ''},Validators.required],
      grupo : [{value: ''},Validators.required],
      estatus :[{value: ''},Validators.required],
      seBorra : [{value: ''},Validators.required],     
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

	public getEmpresaAll(){
		this._empresaService.empresa_list().subscribe(
			response => {
				if (response.empresa){
					this.empresalst = response.empresa;
					//console.log(this.empresalst);
				} else {
					console.log('error al responder');
				}
			}
		);
  }
  
  mk_save(){
    if (this.mkid==='0'){      
      
      this.formaSucursal.value.cveUsuarioAlta=this.login.usuario;  
      this.formaSucursal.value.fechaAlta=this.hoy;    
      this._sucursalService.sucursal_new(this.formaSucursal.value).subscribe(
        response => {
          if (response.sucursal){    
            //console.log(response.sucursal);
            this.sucursal = response.sucursal;
            //console.log('se guardo'); 
            Swal('Guardar...'+this.sucursal.clave,'Se guardo Correctamente la Sucursal','success');
            this._router.navigate(['/sucursal/list']);
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
      this._sucursalService.sucursal_edit(this.formaSucursal.value,this.mkid).subscribe(
        response => {
          if (response.sucursal){
            //console.log(response.empresa);
            this.sucursal = response.sucursal;
            //console.log('se guardo');
            Swal('Guardar...'+this.sucursal.clave,'Se guardo correctamente la sucursal','success');
            this._router.navigate(['/sucursal/list']);
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
