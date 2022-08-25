const {Schema, model} = require('mongoose')

const AeropuertoSchema = new Schema({
    nombre:{
        type: String,
        required: true,
    },
    dni:{
        type: String,
        required: true,
    },
    correo:{
        type: String,
        required: true,
    },
    telefono:{
        type: String,
        required: true,
    },
    vueloId:{
        type: String,
        required: true,
    }

},{
    timestamps: true,
    versionKey: false,
})

module.exports = model("Aeropuerto", AeropuertoSchema)
