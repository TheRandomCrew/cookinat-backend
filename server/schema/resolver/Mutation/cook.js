const { update } = require('../../../database/postgREST/cook');

module.exports = {
    cookUpdate: async (_, { input }) => {
        return await update(input);
    }
}