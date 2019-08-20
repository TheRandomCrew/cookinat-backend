const { update, create } = require('../../../database/postgREST/review');

module.exports = {
    reviewCreate: async (_, { input }) => {
        return await create(input);
    },
    reviewToggle: async (_, { input }) => {
        return await update(input);
    }
}