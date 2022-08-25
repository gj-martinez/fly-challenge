const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInputObjectType, GraphQLFloat, GraphQLInt,GraphQLList} = require('graphql')
const { DateResolver, TimeResolver } = require('graphql-scalars')
const {ObjectId} = require('mongodb')
const connectDB = require('../db')


const AeropuertoType = new GraphQLObjectType ({
    name: "AeropuertoType",
    description: "AeropuertoType",
    fields: {
        _id:{type: GraphQLID},
        nombre:{type: GraphQLString},
        descripcion:{type: GraphQLString},
        localidad:{type: GraphQLString},
    },
});
const EditAeropuertoType = new GraphQLInputObjectType ({
    name: "EditAeropuertoType",
    description: "EditAeropuertoType",
    fields: {
        nombre:{type: GraphQLString},
        descripcion:{type: GraphQLString},
        localidad:{type: GraphQLString},
    },
});
const VueloType = new GraphQLObjectType ({
    name: "VueloType",
    description: "VueloType",
    fields: {
        _id:{type: GraphQLID},
        origen:{type: AeropuertoType, async resolve(parent){
            let db
            let aeropuertoOrigen
            try {
                db = await connectDB()
                aeropuertoOrigen = await db.collection('aeropuerto').findOne({ _id: ObjectId(parent.origen) })
                
            } catch (error) {
                console.error(error)
            }
            return aeropuertoOrigen
        }},
        destino:{type: AeropuertoType, async resolve(parent){
            let db
            let aeropuertoDestino 
            try {
                db = await connectDB()
                aeropuertoDestino = await db.collection('aeropuerto').findOne({ _id: ObjectId(parent.destino) })
                
            } catch (error) {
                console.error(error)
            }
            return aeropuertoDestino
        }},
        precio:{type: GraphQLFloat},
        disponible:{type: GraphQLInt},
        fecha:{type: DateResolver},
        time:{type: TimeResolver},
        precioTotal:{type: GraphQLFloat},

    },
});
const EditVueloType = new GraphQLInputObjectType ({
    name: "EditVueloType",
    description: "EditVueloType",
    fields: {
        origen:{type: GraphQLString},
        destino:{type: GraphQLString},
        precio:{type: GraphQLFloat},
        fecha:{type: DateResolver},
        time:{type: TimeResolver},
        disponible:{type: GraphQLInt},
    },
});
const InputPasajeType = new GraphQLInputObjectType ({
    name: "InputPasajeType",
    description: "InputPasajeType",
    fields: {
        nombre:{type: GraphQLString},
        dni:{type: GraphQLString},
        correo:{type: GraphQLString},
        telefono:{type: GraphQLString},
        precio:{type: GraphQLFloat},
    },
});

const PasajeroType = new GraphQLObjectType ({
    name: "PasajeroType",
    description: "PasajeroType",
    fields: {
        nombre:{type: GraphQLString},
        dni:{type: GraphQLString},
        correo:{type: GraphQLString},
        telefono:{type: GraphQLString},
    },
});

const PasajeType = new GraphQLObjectType ({
    name: "PasajeType",
    description: "PasajeType",
    fields: {
        _id:{type: GraphQLID},
        vueloIda:{type: VueloType, async resolve(parent){
            let cantPasajero = parent.pasajeros.length
            let db
            let vueloIda
            try {
                db = await connectDB()
                vueloIda = await db.collection('vuelo').findOne({ _id: ObjectId(parent.vueloIda) })
                
            } catch (error) {
                console.error(error)
            }
            let descuento = cantPasajero;
            descuento /= 10;
            precioTotal = ((vueloIda.precio * descuento) * cantPasajero )  + vueloIda.precio;
            vueloIda.precioTotal = precioTotal

            return vueloIda
        }},
        vueloVuelta:{type: VueloType, async resolve(parent){
            let cantPasajero = parent.pasajeros.length
            let db
            let vueloVuelta 
            try {
                db = await connectDB()
                vueloVuelta = await db.collection('vuelo').findOne({ _id: ObjectId(parent.vueloVuelta) })
                
            } catch (error) {
                console.error(error)
            }
            let descuento = cantPasajero;
            descuento /= 10;
            precioTotal = ((vueloVuelta.precio * descuento) * cantPasajero )  + vueloVuelta.precio;
            vueloVuelta.precioTotal = precioTotal
            
            return vueloVuelta
        }},
        pasajeros:{type: new GraphQLList(PasajeroType) }
    },
});

module.exports = {
    AeropuertoType,
    EditAeropuertoType,
    VueloType,
    EditVueloType,
    PasajeType,
    InputPasajeType,
};