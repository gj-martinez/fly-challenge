const {  GraphQLString, GraphQLObjectType,GraphQLFloat,GraphQLInt,GraphQLList } = require("graphql");
const { DateResolver, TimeResolver } = require('graphql-scalars')
const connectDB = require('../db');
const {ObjectId} = require('mongodb')
const {AeropuertoType,EditAeropuertoType,VueloType,EditVueloType,PasajeType,InputPasajeType} = require("./types");


const createAeropuerto = {
    type: AeropuertoType,
    description: "Return AeropuertoType",
    args:{
        nombre:{type: GraphQLString},
        descripcion:{type: GraphQLString},
        localidad:{type: GraphQLString},
    },
    async resolve(_,args) {
        let db 
        let aeropuerto
        const newAeropuerto = Object.assign(args)
        try {
            db = await  connectDB()
            aeropuerto = await db.collection('aeropuerto').insertOne(args)
            newAeropuerto._id = aeropuerto.insertedId
        } catch (error) {
            console.error(error)
        }
        return newAeropuerto

    } 
}
const editAeropuerto = {
    type: AeropuertoType,
    description: "Return AeropuertoType",
    args:{
        id:{type: GraphQLString},
        field:{type: EditAeropuertoType},
    },
    async resolve(_,{id,field}) {
        let db
        let aeropuerto 

        try {
            db = await connectDB()
            await db.collection('aeropuerto').updateOne({ _id: ObjectId(id) },{$set:field})
            aeropuerto = await db.collection('aeropuerto').findOne({ _id: ObjectId(id) })
        } catch (error) {
            console.error(error)
        }
        return aeropuerto
    } 
}
const createVuelo = {
    type: VueloType,
    description: "Return VueloType",
    args:{
        origen:{type: GraphQLString},
        destino:{type: GraphQLString},
        precio:{type: GraphQLFloat},
        disponible:{type: GraphQLInt},
        fecha:{type: DateResolver},
        time:{type: TimeResolver},
    },
    async resolve(_,args) {
        let db 
        let vuelo
        const newVuelo = Object.assign(args)
        try {
            db = await  connectDB()
            vuelo = await db.collection('vuelo').insertOne(args)
            newVuelo._id = vuelo.insertedId
        } catch (error) {
            console.error(error)
        }
        return newVuelo

    } 
}
const editVuelo = {
    type: VueloType,
    description: "Return VueloType",
    args:{
        id:{type: GraphQLString},
        field:{type: EditVueloType},
    },
    async resolve(_,{id,field}) {
        let db
        let vuelo 

        try {
            db = await connectDB()
            await db.collection('vuelo').updateOne({ _id: ObjectId(id) },{$set:field})
            vuelo = await db.collection('vuelo').findOne({ _id: ObjectId(id) })
        } catch (error) {
            console.error(error)
        }
        return vuelo
    } 
}
const createPasaje = {
    type: PasajeType,
    description: "Return PasajeType",
    args:{
        vueloIda:{type: GraphQLString},
        vueloVuelta:{type: GraphQLString},
        pasajeros:{type: new GraphQLList(InputPasajeType)},
    },
    async resolve(_,args) {
        let cantPasajero = args.pasajeros.length
        let db 
        let pasaje
        const newPasaje = Object.assign(args)
        try {
            db = await  connectDB()

            vueloIda = await db.collection('vuelo').findOne({ _id: ObjectId(args.vueloIda) })
            newDisponibleIda = vueloIda.disponible - cantPasajero
            await db.collection('vuelo').updateOne({ _id: ObjectId(args.vueloIda) },{$set:{"disponible": newDisponibleIda}})
            

            vueloVuelta = await db.collection('vuelo').findOne({ _id: ObjectId(args.vueloVuelta) })
            newDisponibleVuelta = vueloVuelta.disponible - cantPasajero
            await db.collection('vuelo').updateOne({ _id: ObjectId(args.vueloVuelta) },{$set:{"disponible":newDisponibleVuelta}})

            pasaje = await db.collection('pasaje').insertOne(args)
            newPasaje._id = pasaje.insertedId
            
        } catch (error) {
            console.error(error)
        }
        return newPasaje

    } 
}
module.exports = {
    createAeropuerto,
    editAeropuerto,
    createVuelo,
    createPasaje,
    editVuelo
};