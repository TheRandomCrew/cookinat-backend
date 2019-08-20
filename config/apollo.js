const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../schema/typeDef');
const resolvers = require('../schema/resolver')

module.exports = (app) => {
    const apollo = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        playground: true
    });

    apollo.applyMiddleware({ app, path: '/graphql' });
}