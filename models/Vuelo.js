
const mongoose = require('mongoose')
var Float = require('mongoose-float').loadType(mongoose);

const vueloSchema = new mongoose.Schema({
    origen:{
        type: String,
        required: true,
    },
    destino:{
        type: String,
        required: true,
    },
    precio:{
        type: Float,
        required: true,
    },
    disponible:{
        type: Number,
        required: true,
    },
    fecha:{
        type: String,
        required: true,
    }
},{
    timestamps: true,
    versionKey: false,
})

module.exports = mongoose.model("Vuelo", vueloSchema)
