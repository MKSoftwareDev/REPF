import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import {Router, NavigationStart, NavigationEnd} from '@angular/router';
import {Helpers} from "./helpers";
//Servicios
import { UserService } from '../app/_services/u/user.service';



@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
	encapsulation: ViewEncapsulation.None,
	providers: [UserService]
})

export class AppComponent implements OnInit, AfterViewInit {
	title = 'app';
	public identity: any;
  public login: any;


  public empresa: string;
  public sucursal: string;
  public fechaTrabajo : string;
  public usuario : string;

  constructor(
    private _router: Router,private _userService: UserService
    ) {
 


    }

  ngOnInit() {
  
		this._router.events.subscribe((route) => {
			if (route instanceof NavigationStart) {
				Helpers.setLoading(true);
				Helpers.bodyClass('fixed-navbar');
			}
			if (route instanceof NavigationEnd) {
				window.scrollTo(0, 0);
				Helpers.setLoading(false);

				// Initialize page: handlers ...
				Helpers.initPage();
			}

		});
		this.login = JSON.parse(this._userService.getLogin());
    this.identity = this._userService.getIdentity();

    if (this.identity!==null && this.identity!==undefined && this.identity.nombre!==undefined) {
      this.empresa = this.login.empresa;
      this.fechaTrabajo = this.login.fecha;
      this.sucursal = this.login.sucursal;
      this.usuario = this.identity.nombre +' '+ this.identity.paterno;
    } else {

      console.log('footer no se encontro localStorage.nombre');

    }
  }

	ngAfterViewInit() {}
	

    


}
