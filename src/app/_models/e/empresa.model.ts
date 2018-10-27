export class Empresa {
    constructor (
        public _Id: string,
        public clave: string,
        public nombre: string,
        public rfc: string,      
        public grupo: string,
        public estatus: string,
        public seBorra: boolean,
        public fechaAlta: Date,
    ){}
}

