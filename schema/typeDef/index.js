const { importSchema } = require('graphql-import');

const typeDefs = importSchema('schema/typeDef/schema.graphql');

module.exports = typeDefs;