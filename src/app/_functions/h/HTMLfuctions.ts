'use strict'
import * as $ from "jquery";

declare var toastr: any;
declare var jQuery:any;
declare var $:any;
declare var Clipboard:any;

export class HTMLfuctions {
    static getEstatusClass(mk_estatus){
        let Estatus =mk_estatus;

        if (Estatus == "ALTA"){
            return 'badge badge-success badge-pill';
        } else if (Estatus == "BAJA") {
            return 'badge badge-danger badge-pill';
        } else if (Estatus == "PENDIENTE") {
            return 'badge badge-warning badge-pill';
        } else {
            return 'badge badge-secondary badge-pill';
        }
    }
}