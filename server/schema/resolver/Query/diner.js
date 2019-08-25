const { byParam, all } = require('../../../database/postgREST/diner');

module.exports = {
    diner: async (_, { user_id }) => {
        return await byParam('user_id', user_id);
    },
    diners: async (_, { }) => {
        return await all();
    }
}