const { update } = require('../../../database/postgREST/user');

module.exports = {
    userChangeConfig: async (_, { input }) => {
        return await update(input);
    }
}