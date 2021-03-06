import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { devEmpresaConfig } from '../../../_config/d/devEmpresa.config';
import { DatePipe } from '@angular/common';
import { UserService } from '../../../_services/u/user.service';
import { HTMLfuctions } from '../../../_functions/h/HTMLfuctions';
import Swal from 'sweetalert2';

declare var $:any;


@Component({
  selector: 'app-user',
  templateUrl: './list.usuario.component.html',
	providers: [UserService]
})
export class UserListComponent implements OnInit, AfterViewInit, OnChanges {
  public devEmpresa: string;
  public formatoFecha:string;
  public classEstatus:string;
	public title: string;
  public userlst: string[];
    
  constructor(
    private _userService: UserService,
    private datePipe: DatePipe	

  ) { 
    this.devEmpresa = devEmpresaConfig.nombre;
    this.formatoFecha=devEmpresaConfig.formatoFecha;
    this.title="Usuarios";
    this.userlst=[];
  }

  ngOnChanges() {
    console.log('00 Componente user OnChanges');	
  }

  ngOnInit() {
    console.log('01 Componente user OnInit');		
    this.getUserAll();	
  }


  mk_getBottonClass(status){
    return HTMLfuctions.getEstatusClass(status);
  }

  ngAfterViewInit() {

    setTimeout(function(){  
        $( document ).ready(function() {
            console.log( "ready!" );
        
            $('#datatable_user').DataTable({
                pageLength: 10,
                fixedHeader: true,
                responsive: true,
                "sDom": 'rtip',
                columnDefs: [{
                    targets: 'no-sort',
                    orderable: false
                }]
            }); 
            
            var table = $('#datatable_user').DataTable(); 

            $('#key-search').on('keyup', function() {
                table
                    .search(this.value)
                    .draw();
            });
        
            $('#type-filter').on('change', function() {
                table.column(5).search($(this).val()).draw();
            });    
        });
    },300);
  }

	getUserAll(){
		this._userService.user_list().subscribe(
			response => {
				if (response.user){
          this.userlst = response.user;
          console.log(this.userlst);
				} else {
					console.log('error al responder');
				}
			}
		);
	}

}
