const {GraphQLSchema, GraphQLObjectType} = require('graphql')

const {aeropuertos,getAeropuerto,vuelos,getVuelosIda,getVuelosVuelta} = require('./queries');
const {createAeropuerto,editAeropuerto,createVuelo,editVuelo,createPasaje} = require('./mutations');

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type',
    fields:{
        aeropuertos,
        getAeropuerto,
        vuelos,
        getVuelosIda,
        getVuelosVuelta
    },
});

const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'The mutation type',
    fields:{
        createAeropuerto,
        editAeropuerto,
        createVuelo,
        editVuelo,
        createPasaje
    },
})
module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
})

