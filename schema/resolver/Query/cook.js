const { byParam, all } = require('../../../database/postgREST/cook');

module.exports = {
    cook: async (_, { user_id }) => {
        return await byParam('user_id', user_id);
    },
    cooks: async (_, { }) => {
        return await all();
    }
}