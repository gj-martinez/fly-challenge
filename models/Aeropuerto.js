const {Schema, model} = require('mongoose')

const aeropuertoSchema = new Schema({
    nombre:{
        type: String,
        required: true,
    },
    descripcion:{
        type: String,
        required: true,
    },
    localidad:{
        type: String,
        required: true,
    }
},{
    timestamps: true,
    versionKey: false,
})

module.exports = model("Aeropuerto", aeropuertoSchema)
