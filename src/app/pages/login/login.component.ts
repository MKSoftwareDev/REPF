import { Component, OnInit, AfterViewInit, OnDestroy, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// modelos
import { User } from '../../_models/u/user.model';

// servicios
import { ScriptLoaderService } from '../../_services/script-loader.service';
import { UserService } from '../../_services/u/user.service';
import { EmpresaService } from '../../_services/e/empresa.services';

// sweetalert2
import swal from 'sweetalert2';

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
}
