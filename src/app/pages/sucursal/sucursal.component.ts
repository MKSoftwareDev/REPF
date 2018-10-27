import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { devEmpresaConfig } from '../../_config/d/devEmpresa.config';

// servicios
import { SucursalService } from '../../_services/s/sucursal.service';
// Alerts
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
	providers: [SucursalService]
})
export class SucursalComponent implements OnInit, AfterViewInit, OnChanges {
	public devEmpresa: string;
	public title: string;
    public sucursallst: string[];
    
  constructor(
    private _sucursalService: SucursalService,	


  ) { 
    this.devEmpresa = devEmpresaConfig.nombre;	
    this.title="Sucursal";
    this.sucursallst=[];
  }

  ngOnChanges() {
    console.log('00 Componente Sucursal iniciado');	
  }

  ngOnInit() {
    console.log('01 Componente Sucursal iniciado');		
    this.getSucursalAll();	
  }

  ngAfterViewInit() {

    setTimeout(function(){  
        $( document ).ready(function() {
            console.log( "ready!" );
        
            $('#datatable_suc').DataTable({
                pageLength: 10,
                fixedHeader: true,
                responsive: true,
                "sDom": 'rtip',
                columnDefs: [{
                    targets: 'no-sort',
                    orderable: false
                }]
            }); 
            
            var table = $('#datatable_suc').DataTable(); 

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
    this._sucursalService.sucursalesAll().subscribe(
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

}
