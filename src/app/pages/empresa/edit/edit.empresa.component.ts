import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { devEmpresaConfig } from '../../../_config/d/devEmpresa.config';
import { Empresa } from '../../../_models/e/empresa.model';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../_services/u/user.service';


// servicios
import { EmpresaService } from '../../../_services/e/empresa.services';
// Alerts
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-empresa-edit',
  templateUrl: './edit.empresa.component.html',
  providers: [EmpresaService,FormsModule,ReactiveFormsModule,UserService]
  
})
export class EmpresaEditComponent implements OnInit, AfterViewInit, OnChanges {
	public devEmpresa: string;
	public title: string;
  public empresalst: string[];
  public mkid : string;
  public empresa: Empresa;
  public mkEditar: boolean;
  public mkEditarID: boolean;
  public login: any;
  public hoy: Date;


  formaEmpresa:  FormGroup;
    
  constructor(
    private _empresaService: EmpresaService,	
    private _userService: UserService,
    private rutaActiva: ActivatedRoute,
    private _fb: FormBuilder,
    private _router: Router,


  ) { 
    this.devEmpresa = devEmpresaConfig.nombre;	
    this.title="Edit Empresa";
    this.empresalst=[];
    this.mkEditar=false;
    this.mkEditarID=true;
    this.hoy=new Date();
    this.login=JSON.parse(this._userService.getLogin());

  }

  ngOnChanges() {
    console.log('00 Componente empresa iniciado');	
  }

  ngOnInit() {

    console.log('01 Componente empresa iniciado');
    this.mk_openTap('general');
    this.createForm();
    this.mkid=this.rutaActiva.snapshot.params._id;

    if (this.mkid==='0'){
      this.title="Nueva Empresa";
      //this.empresa = new Empresa('','','','','','',true,null,[],[]);
      this.formaEmpresa.reset();    
      this.mkEditar=false;  
    }else {

      this._empresaService.empresa_uno(this.mkid).subscribe(
        response => {
          if (response.empresa){
            this.empresa = response.empresa;            
            this.title=this.empresa[0].clave+"-"+this.empresa[0].nombre;
            this.formaEmpresa.controls['clave'].setValue(this.empresa[0].clave);
            this.formaEmpresa.controls['nombre'].setValue(this.empresa[0].nombre);
            this.formaEmpresa.controls['rfc'].setValue(this.empresa[0].rfc);
            this.formaEmpresa.controls['grupo'].setValue(this.empresa[0].grupo);
            this.formaEmpresa.controls['estatus'].setValue(this.empresa[0].estatus);            
            this.formaEmpresa.controls['seBorra'].setValue(this.empresa[0].seBorra);

          } else {
            console.log('error al responder');
          }
        }
      );      
    }

    //this.getEmpresaAll();	
  }
  public createForm (){
    this.formaEmpresa = this._fb.group({
      clave : [{value: ''},Validators.required],
      nombre : [{value: ''},Validators.required],
      rfc : [{value: ''},Validators.required],
      grupo : [{value: ''},Validators.required],
      estatus :[{value: ''},Validators.required],
      seBorra : [{value: true},Validators.required],
      fechaAlta :[{value: ''},Validators.required],
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


public mk_openTap(mk_TabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(mk_TabName).style.display = "block";
    //evt.currentTarget.className += " active";
}

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


  mk_save(){
    if (this.mkid==='0'){      
      this.formaEmpresa.value.fechaAlta=this.hoy;       
      this.formaEmpresa.value.cveUsuarioAlta=this.login.usuario;
      this._empresaService.empresa_new(this.formaEmpresa.value).subscribe(
        response => {
          if (response.empresa){    
            console.log(response.empresa);
            this.empresa = response.empresa;
            console.log('se guardo'); 
            Swal('Guardar...'+this.empresa.clave,'Se guardo Correctamente la Empresa','success');
            this._router.navigate(['/empresa/list']);
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
      this._empresaService.empresa_edit(this.formaEmpresa.value,this.mkid).subscribe(
        response => {
          if (response.empresa){
            console.log(response.empresa);
            this.empresa = response.empresa;
            //console.log('se guardo');
            Swal('Guardar...'+this.empresa.clave,'Se guardo correctamente la empresa','success');
            this._router.navigate(['/empresa/list']);
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
