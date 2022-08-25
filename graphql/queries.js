const {  GraphQLString, GraphQLList ,GraphQLInt} = require("graphql");
const { AeropuertoType,VueloType } = require("./types");
const { DateResolver } = require('graphql-scalars')
const {ObjectId} = require('mongodb')
const connectDB = require('../db')

const aeropuertos = {
    type: new GraphQLList(AeropuertoType),
    async resolve() {
        let db
        let aeropuerto = []

        try {
            db = await connectDB()
            aeropuerto = await db.collection('aeropuerto').find().toArray()
            
        } catch (error) {
            console.error(error)
        }
        return aeropuerto
    } 
}

const getAeropuerto = {
    type: AeropuertoType,
    args:{
        id:{type: GraphQLString}
    },
    async resolve(_,{id}) {
        let db
        let aeropuerto 

        try {
            db = await connectDB()
            aeropuerto = await db.collection('aeropuerto').findOne({ _id: ObjectId(id) })
            
        } catch (error) {
            console.error(error)
        }
        return aeropuerto
    } 
}

const vuelos = {
    type: new GraphQLList(VueloType),
    async resolve() {
        let db
        let vuelo = []
        try {
            db = await connectDB()
            vuelo = await db.collection('vuelo').find().toArray()
            
        } catch (error) {
            console.error(error)
        }
        return vuelo
    } 
}

const getVuelosIda = {
    type: new GraphQLList(VueloType),
    args:{
        fechaDesde:{type: DateResolver},
        fechaHasta:{type: DateResolver},
        origen:{type: GraphQLString},
        destino:{type: GraphQLString},
        cantPasajero:{type: GraphQLInt}
    },
    async resolve(_,args) {
        let db
        let vuelosIda = []
        try {
            db = await connectDB()
            vuelosIda = await db.collection('vuelo').find({
                disponible: {$gt: args.cantPasajero},
                origen: args.origen,
                destino: args.destino,
                fecha: {$gte: args.fechaDesde,$lte: args.fechaHasta}
            }).toArray()
            
        } catch (error) {
            console.error(error)
        }
        for (i in vuelosIda) {
            let descuento = args.cantPasajero;
            descuento /= 10;
            precioTotal = ((vuelosIda[i].precio * descuento) * args.cantPasajero )  + vuelosIda[i].precio;
            vuelosIda[i].precioTotal = precioTotal
        }
        return vuelosIda
    } 
}
const getVuelosVuelta = {
    type: new GraphQLList(VueloType),
    args:{
        fechaDesde:{type: DateResolver},
        fechaHasta:{type: DateResolver},
        origen:{type: GraphQLString},
        destino:{type: GraphQLString},
        cantPasajero:{type: GraphQLInt}
    },
    async resolve(_,args) {
        let db
        let vuelosVuelta = []
        try {
            db = await connectDB()
            vuelosVuelta = await db.collection('vuelo').find({
                disponible: {$gte: args.cantPasajero},
                origen: args.origen,
                destino: args.destino,
                fecha: {$gte: args.fechaDesde,$lte: args.fechaHasta}
            }).toArray()
            
        } catch (error) {
            console.error(error)
        }
        for (i in vuelosVuelta) {
            let descuento = args.cantPasajero;
            descuento /= 10;
            precioTotal = ((vuelosVuelta[i].precio * descuento) * args.cantPasajero )  + vuelosVuelta[i].precio;
            vuelosVuelta[i].precioTotal = precioTotal
        }

        return vuelosVuelta
    } 
}
module.exports = {
    aeropuertos,
    getAeropuerto,
    vuelos,
    getVuelosIda,
    getVuelosVuelta
};