export class People {
    constructor (
        public _id: string,
        public clave: string,
        public nombre: string,
        public apellido: string,
        public sapellido: string,
        public RFC: string,
        public genero: string,
        public esPEP: boolean,
        public domicilio: string[],
        public correo: string[],
        public nacionalidad: string[],
        public fechaCreacion:Date,        
        public fechaactualizacion:Date,
        public estatus: string,
        public _usuario: string
    ){}
}