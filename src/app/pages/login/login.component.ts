import { Component, OnInit, AfterViewInit, OnDestroy, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { devEmpresaConfig } from '../../_config/d/devEmpresa.config';

// modelos
import { User } from '../../_models/u/user.model';
import { Login } from '../../_models/l/login.model';

// servicios
import { ScriptLoaderService } from '../../_services/script-loader.service';
import { UserService } from '../../_services/u/user.service';
import { EmpresaService } from '../../_services/e/empresa.services';
import { SucursalService } from '../../_services/s/sucursal.service';


// sweetalert2
import Swal from 'sweetalert2';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [UserService, EmpresaService, SucursalService]
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
	public user: User;
	public login : Login;
	public identity;	
	public token;
	public status: string;
	public errores: string[];
	public empresalst: string[];
	public sucursallst: string[];
	public message: string;
	public devEmpresa: string;
	public devEmpresaFrase : string;
	public devEmpresaFraseIni : string;
	public devEmpresaFraseIni2 : string;
	public clickMessage = '';
	public loginUser: string;
	public loginPassword: string;
	public loginEmpresa: string;
	public loginSucursal: string;
	public loginFechaTrabajo: string;
	public LSlogin: any;
	public hoy = new Date();
	public hoytxt: string;
	




  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
	private _userService: UserService,
	private _empresaService: EmpresaService,
	private _sucusalService: SucursalService,
	private _script: ScriptLoaderService
  ) {
		
    this.user = new User('', '',  '',     '',   '',     'ROLE_USER','','','','');
	this.devEmpresa = devEmpresaConfig.nombre;	
	this.devEmpresaFrase= devEmpresaConfig.frace; 
	this.devEmpresaFraseIni= devEmpresaConfig.fraceIni;
	this.devEmpresaFraseIni=devEmpresaConfig.fraceIni2;
	
  }

	ngOnInit() {
		$('body').addClass('empty-layout');	
		console.log('Componente Loginnnn iniciado');
		console.log(this.user);
		this.getEmpresaAll();
		this.getSucursalAll();
	}
	ngAfterViewInit() {
		$('#login-form').validate({
			errorClass:"help-block",
			rules: {
						empresa: {required:true},
						sucursal: {required:true},
						surname: {required:true},
						password: {required:true},
						fechatrabajo: {required:true}
			},
			highlight:function(e){$(e).closest(".form-group").addClass("has-error")},
			unhighlight:function(e){$(e).closest(".form-group").removeClass("has-error")},
		});
		this._script.load('./assets/js/scripts/form-plugins.js');	
  	}

  	ngOnDestroy() {
		$('body').removeClass('empty-layout');
		console.log('Componente Loginnnn Finalizado');
  	}

  	onSubmit() {
   		this.clickMessage = 'You are my hero!';
	 	window.alert(this.clickMessage);
	 	Swal('Oops...', 'Something went wrong!', 'error');
		Swal({
			title: 'Are you sure?',
			text: 'You will not be able to recover this imaginary file!',
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, keep it'
		}).then((result) => {
			if (result.value) {
				Swal(
					'Deleted!',
					'Your imaginary file has been deleted.',
					'success'
				)
			// For more information about handling dismissals please visit
			// https://sweetalert2.github.io/#handling-dismissals
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				Swal(
					'Cancelled',
					'Your imaginary file is safe :)',
					'error'
				)
			}
		})
	}

	public getSucursalAll(){
		this._sucusalService.sucursal_list().subscribe(
			response => {
				if (response.sucursal){
					this.sucursallst = response.sucursal;
					//console.log(this.sucursallst);
				} else {
					console.log('error al responder');
				}
			}
		);
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
	
	MkClickLogin(){
		//console.log(this.user);
		this.loginUser= this.user.surname;
		this.loginPassword=this.user.password;
		this.loginEmpresa = this.user.empresa;
		this.loginSucursal = this.user.sucursal;
		this.loginFechaTrabajo = this.user.fechatrabajo;

		if ( this.loginUser == "" || !this.loginUser ||
			 this.loginPassword == "" || !this.loginPassword ||
			 this.loginEmpresa == "" || !this.loginEmpresa ||
			 this.loginSucursal == "" || !this.loginSucursal ||
			 this.loginFechaTrabajo == "" || !this.loginFechaTrabajo    ) {
			Swal('El usuario no se ha logueado correctamente', this.devEmpresa, 'error');
			this.status='error';		
		} else {	
			this._userService.signup(this.user).subscribe(
				response=>{				
					this.identity=response.user;
					this.message=response.message;
					console.log(this.identity);
					if (!this.identity || !this.identity._id ) {
						Swal('El usuario no se ha logueado correctamente', this.devEmpresa, 'error');
						this.status='error';
					}else{
						this.identity.password='';
						//conseguir el token
						localStorage.setItem('identity',JSON.stringify(this.identity));
						this._userService.signup(this.user,'true').subscribe(
							response=>{
								this.token = response.token;
								if(this.token.length <=0 ){
									Swal('el token no se ha generado', this.devEmpresa, 'error');
									this.status='error';
								}else{
									localStorage.setItem('token', this.token);								
									
									this.LSlogin = { 
										usuario:this.loginUser, 
										empresa:this.loginEmpresa,
										sucursal:this.loginSucursal,
										fecha:this.loginFechaTrabajo
									 };
																	
									localStorage.setItem('login',JSON.stringify(this.LSlogin));
									this.status = 'success';
									Swal('Bienvenido...' + this.identity.nombre , this.devEmpresa, 'success');
									console.log(this.user);
									this._router.navigate(['index']);
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
}
