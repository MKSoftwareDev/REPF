import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { devEmpresaConfig } from '../../../_config/d/devEmpresa.config';
import { DatePipe } from '@angular/common';
import { HTMLfuctions } from '../../../_functions/h/HTMLfuctions';
import { SucursalService } from '../../../_services/s/sucursal.service';
import Swal from 'sweetalert2';

declare var $:any;

@Component({
  selector: 'app-sucursal',
  templateUrl: './list.sucursal.component.html',
	providers: [SucursalService]
})
export class SucursalListComponent implements OnInit, AfterViewInit, OnChanges {
  public devEmpresa: string;
  public formatoFecha:string;
  public classEstatus:string;
	public title: string;
  public sucursallst: string[];
    
  constructor(
    private _sucursalService: SucursalService,
    private datePipe: DatePipe	


  ) { 
    this.devEmpresa = devEmpresaConfig.nombre;
    this.formatoFecha=devEmpresaConfig.formatoFecha;
    this.title="Sucursales";
    this.sucursallst=[];
  }

  ngOnChanges() {
    console.log('00 Componente sucursal iniciado');	
  }

  ngOnInit() {
    console.log('01 Componente sucursal iniciado');		
    this.getSucursalAll();	
  }

  mk_getBottonClass(status){
    return HTMLfuctions.getEstatusClass(status);
  }

  ngAfterViewInit() {

    setTimeout(function(){  
        $( document ).ready(function() {
            console.log( "ready!" );
        
            $('#datatable_sucursal').DataTable({
                pageLength: 10,
                fixedHeader: true,
                responsive: true,
                "sDom": 'rtip',
                columnDefs: [{
                    targets: 'no-sort',
                    orderable: false
                }]
            }); 
            
            var table = $('#datatable_sucursal').DataTable(); 

            $('#key-search').on('keyup', function() {
                table
                    .search(this.value)
                    .draw();
            });
        
            $('#type-filter').on('change', function() {
                table.column(4).search($(this).val()).draw();
            });    
        });
    },300);
  }

	getSucursalAll(){
		this._sucursalService.sucursal_list().subscribe(
			response => {
				if (response.sucursal){
          this.sucursallst = response.sucursal;
          console.log(response.sucursal);
				} else {
					console.log('error al responder');
				}
			}
		);
	}

}
