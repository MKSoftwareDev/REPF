import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { devEmpresaConfig } from '../../../_config/d/devEmpresa.config';

// servicios
import { EmpresaService } from '../../../_services/e/empresa.services';
// Alerts
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-empresa-edit',
  templateUrl: './edit.component.html',
	providers: [EmpresaService]
})
export class EmpresaEditComponent implements OnInit, AfterViewInit, OnChanges {
	public devEmpresa: string;
	public title: string;
    public empresalst: string[];
    
  constructor(
    private _empresaService: EmpresaService,	


  ) { 
    this.devEmpresa = devEmpresaConfig.nombre;	
    this.title="Edit Empresa";
    this.empresalst=[];
  }

  ngOnChanges() {
    console.log('00 Componente empresa iniciado');	
  }

  ngOnInit() {
    console.log('01 Componente empresa iniciado');		
    this.getEmpresaAll();	
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
		this._empresaService.empresasAll().subscribe(
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

}
