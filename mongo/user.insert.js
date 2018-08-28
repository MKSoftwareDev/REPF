use MKSD

( {
    empresa:{
        nombre:     'MK Software Developers',
        iniciales:  'MKSD',
        url:        'http://www.mksoftwaredev.com/',
        correoInfo: 'info@mksoftwaredev.com',
        frase:      'Always looking for the best solution'
    },
    backend:{
        url:    'http://localhost:8080/bkd/'
    }
});

db.users.save({
	surname:	'HROSALES',
	nombre:		'Hector',
	paterno:	'Rosales',
	materno:	'Ortiz',
	rfc:		'ROOH7510228P7',
	curp:		'ROOH7510228P7',
	email:		'hrosales@mksoftwaredev.com',
	password: {type: String,	required: true},
	role: String,
	imagen: String,
	domicilio: [{
	tipo: String,
	direccion: String,
	numext: String,
	numint: String,
	cp: Number,
	colonia: String,
	municipio: String,
	delegacion: String,
	estado: String
	}],
	telefono:[{
		tipo: String,
		numero: String,
		extension: String
	}],
	MKdefault:{
		empresa: String,
		sucursal: String,
		almacen: String,
		cta: String
	},
	grupo: {type: String, default: 'Developers'},
	departamento: {type: String, default: 'Ventas'},

});