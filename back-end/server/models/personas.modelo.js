const mongoose = require('mongoose');

let shcema = mongoose.shcema;

let personasSchema = new shcema({

    strNombre: {
        type: String,
        required:[true,'por favor ingrese Su Nombre']
    },

    strApellidoPaterno:{
        type: String,
        required:[true,'por favor ingrese su Apellido paterno']
    },
    strApellidoMaterno:{
        type: String,
        required:[true,'por favor ingrese su Apellido materno ']
    },
    strCorreo:{
        type: String,
        required:[true,'por favor ingrese su correo electronico']
    },
    nmbTelefono:{
        type: Number,
        required:[true,'por favor ingrese su telefono']
    },
    strPuesto:{
        type: Number,
        required:[true,'por favor ingrese su telefono']
    },
    blnActivo:{
        type:Boolean,
        default: true
    },  


    //ajsnRol:[RolModel.shcema]
}
);

module.exports = mongoose.model('persona',personasSchema) 