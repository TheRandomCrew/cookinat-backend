const { byParam, all } = require('../../../database/postgREST/diner');

module.exports = {
    diner: async (_, { diner_id }) => {
        return await byParam('diner_id', diner_id);
    },
    diners: async (_, { }) => {
        return await all();
    }
}