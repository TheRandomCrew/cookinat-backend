const { byParam, all } = require('../../../database/postgREST/cook');

module.exports = {
    cook: async (_, { cook_id }) => {
        return await byParam('cook_id', cook_id);
    },
    cooks: async (_, { }) => {
        return await all();
    }
}