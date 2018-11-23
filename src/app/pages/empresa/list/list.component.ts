import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { devEmpresaConfig } from '../../../_config/d/devEmpresa.config';
import { DatePipe } from '@angular/common';

// servicios
import { EmpresaService } from '../../../_services/e/empresa.services';
// Alerts
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-empresa',
  templateUrl: './list.component.html',
	providers: [EmpresaService]
})
export class EmpresaListComponent implements OnInit, AfterViewInit, OnChanges {
  public devEmpresa: string;
  public formatoFecha:string;
  public classEstatus:string;
	public title: string;
  public empresalst: string[];
    
  constructor(
    private _empresaService: EmpresaService,
    private datePipe: DatePipe	


  ) { 
    this.devEmpresa = devEmpresaConfig.nombre;
    this.formatoFecha=devEmpresaConfig.formatoFecha;
    this.title="Empresa";
    this.empresalst=[];
  }

  ngOnChanges() {
    console.log('00 Componente empresa iniciado');	
  }

  ngOnInit() {
    console.log('01 Componente empresa iniciado');		
    this.getEmpresaAll();	
  }

  mk_getClass(status){
    this.classEstatus=status;
    //console.log(this.classEstatus);
    if (this.classEstatus == "ALTA"){
      return 'badge badge-success badge-pill';
    } else if (this.classEstatus == "BAJA") {
      return 'badge badge-danger badge-pill';
    } else if (this.classEstatus == "PENDIENTE") {
      return 'badge badge-primary badge-pill';
    } else {
      return 'badge badge-success badge-pill';
    }
  }

  ngAfterViewInit() {

    setTimeout(function(){  
        $( document ).ready(function() {
            console.log( "ready!" );
        
            $('#datatable_empresa').DataTable({
                pageLength: 10,
                fixedHeader: true,
                responsive: true,
                "sDom": 'rtip',
                columnDefs: [{
                    targets: 'no-sort',
                    orderable: false
                }]
            }); 
            
            var table = $('#datatable_empresa').DataTable(); 

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

	getEmpresaAll(){
		this._empresaService.empresa_list().subscribe(
			response => {
				if (response.empresa){
					this.empresalst = response.empresa;
				} else {
					console.log('error al responder');
				}
			}
		);
	}

}
