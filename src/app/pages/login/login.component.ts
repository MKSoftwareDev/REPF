import { Component, OnInit, AfterViewInit, OnDestroy, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// modelos
import { User } from '../../_models/u/user.model';

// servicios
import { ScriptLoaderService } from '../../_services/script-loader.service';
import { UserService } from '../../_services/u/user.service';
import { EmpresaService } from '../../_services/e/empresa.services';

// sweetalert2
import Swal from 'sweetalert2';
//const Swal = require('sweetalert2');

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [UserService, EmpresaService]
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  public user: User;
  public identity;
  public token;
	public status: string;
	public errores: string[];
	public empresalst: any[];
  public message: string;
  public anio: number;
  public devEmpresa: string;
	public clickMessage = '';
	public loginEmpresa: string;
	public loginSucursal: string;
	public loginFechaTrabajo: string;
	public lUsers: any[] = [
		{ Name: 'Billy Williams', Gender: 'male' },
		{ Name: 'Sally Ride', Gender: 'female'}
		];
		curUser: any;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
		private _userService: UserService,
		private _empresaService: EmpresaService,
		private _script: ScriptLoaderService
  ) {
		//_id,name,surname,email,password,role,      image,empresa,sucursal,fechatrabajo
    this.user = new User('', '',  '',     '',   '',     'ROLE_USER','','','','');
    this.anio = (new Date).getFullYear();
    this.devEmpresa ='MK Software Developers';
  }

  ngOnInit() {
    $('body').addClass('empty-layout');
     console.log('Componente Loginnnn iniciado');
    // console.log(localStorage.getItem('identity'));
    // console.log(localStorage.getItem('token'));
    // console.log(this._userService.getIdentity());
		// console.log(this._userService.getToken());
		// console.log(this._empresaService.empresaServiceTest());
		this.getEmpresaAll();
  }


  ngAfterViewInit() {
    $('#login-form').validate({
        errorClass:"help-block",
        rules: {
					  empresa: {required:true},
					  sucursal: {required:true},
					  surname: {required:true},
            password: {required:true}
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
    //console.log(this.user);
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
	 this._router.navigate(['index']);
	 }
	 
	getEmpresaAll(){
		this._empresaService.empresasAll().subscribe(
			response => {
				if (response.empresa){
				this.empresalst = response.empresa;
					console.log(this.empresalst);
				} else {
					console.log('error al responder');
				}
			}
		);
	}

	 MkClickLogin(){
		//console.log('inicio');
		console.log(this.user);
		//loguear al usuario y conseguir el objeto
		this.loginEmpresa = this.user.empresa;
		this.loginSucursal = this.user.sucursal;
		this.loginFechaTrabajo = this.user.fechatrabajo;


		this._userService.signup(this.user,).subscribe(
			response=>{

				
				this.identity=response.user;
				this.message=response.message;
				//console.log(response.user);
				//console.log(response.user);

				//if(!this.identity || !this.identity._id){
				if (!this.identity || !this.identity._id) {
					console.log('El usuario no se ha logueado correctamente');
					this.status='error';
				}else{
					this.identity.password='';
					//conseguir elñ token
					//console.log(this.identity);
					localStorage.setItem('identity',JSON.stringify(this.identity));
					this._userService.signup(this.user,'true').subscribe(
						response=>{
							this.token = response.token;
							if(this.token.length <=0 ){
								alert('el token no se ha generado');
								this.status='error';

							}else{
								//console.log(this.token);
								localStorage.setItem('token', this.token);
								localStorage.setItem('loginEmpresa',this.loginEmpresa);
								localStorage.setItem('loginSucursal',this.loginSucursal);
								localStorage.setItem('loginFechaTrabajo',this.loginFechaTrabajo);


								this.status = 'success';
								Swal('Bienvenido...' + this.identity.nombre , this.devEmpresa, 'success');
								this._router.navigate(['index']);
							}
						},
						error=>{
							console.log('Segundo Error');
							console.log(<any>error);
						}				 			
					);
				}
			},
			error=>{
				//console.log('Primer Error');
				console.log(<any>error)
				var errorMessage =<any>error;
				if (errorMessage != null) {
					var mkerrores =JSON.parse(error._body);
					//console.log(mkerrores.message);					
					//alert(mkerrores.message);
					Swal(mkerrores.message + '...', this.devEmpresa+'HRO', 'error');
					this.status='error';

			}
		}
	);		
	}
}
