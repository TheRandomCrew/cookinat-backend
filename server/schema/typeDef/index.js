const { importSchema } = require('graphql-import');

const typeDefs = importSchema('server/schema/typeDef/schema.graphql');

module.exports = typeDefs;