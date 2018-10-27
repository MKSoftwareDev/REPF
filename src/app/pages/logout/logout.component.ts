import { Component, OnInit, AfterViewInit, OnDestroy, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { devEmpresaConfig } from '../../_config/d/devEmpresa.config';


import Swal from 'sweetalert2';

declare var $:any;

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit, AfterViewInit, OnDestroy {

	public devEmpresa: string;

	




  constructor(
    private _route: ActivatedRoute,
    private _router: Router

  ) {
	this.devEmpresa = devEmpresaConfig.nombre;	

	
  }

	ngOnInit() {		
		console.log('Componente Logout iniciado');
		Swal({
			title: '¿Quieres salir del sistema?',
			text: this.devEmpresa,
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, Seguro',
			cancelButtonText: 'No, gracias'
		}).then((result) => {
			if (result.value) {
				Swal(
					'Adios!',
					this.devEmpresa,
					'success'
				)
				localStorage.clear();
				this._router.navigate(['']);
			// For more information about handling dismissals please visit
			// https://sweetalert2.github.io/#handling-dismissals
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				Swal(
					'Cancelled',
					this.devEmpresa,
					'error'
				)
				this._router.navigate(['index']);
			}
		})

	}
	ngAfterViewInit() {		
  	}

  	ngOnDestroy() {		
  	}
}
