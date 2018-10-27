import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { devEmpresaConfig } from '../../../_config/d/devEmpresa.config';

// servicios
import { PeopleService } from '../../../_services/p/people.services';
// Alerts
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-list-people',
  templateUrl: './list.people.component.html',
	providers: [PeopleService]
})

export class PeopleComponent implements OnInit, AfterViewInit, OnChanges {
	public devEmpresa: string;
	public title: string;
    public peoplelista: string[];
    
  constructor(
    private _peopleService: PeopleService,	


  ) { 
    this.devEmpresa = devEmpresaConfig.nombre;	
    this.title="Personas";
    this.peoplelista=[];
  }

  ngOnChanges() {
    console.log('00 Componente People iniciado');	
  }

  ngOnInit() {
    console.log('01 Componente people iniciado');		
    this.getPeopleAll();	
  }

  ngAfterViewInit() {

    setTimeout(function(){  
        $( document ).ready(function() {
            console.log( "ready!" );
        
            $('#datatable_people').DataTable({
                pageLength: 10,
                fixedHeader: true,
                responsive: true,
                "sDom": 'rtip',
                columnDefs: [{
                    targets: 'no-sort',
                    orderable: false
                }]
            }); 
            
            var table = $('#datatable_people').DataTable(); 

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

  getPeopleAll(){
        this._peopleService.people_ServTodas().subscribe(
            response => {
                if (response.people){
                    this.peoplelista = response.people;
                    
                } else {
                    console.log('error al responder');
                }
            }
        );
    }

}

