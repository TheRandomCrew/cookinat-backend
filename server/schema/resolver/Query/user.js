const { byParam } = require('../../../database/postgREST/user');

module.exports = {
    user: async (_, { user_id }) => {
        return await byParam('user_id', user_id);
    }
}