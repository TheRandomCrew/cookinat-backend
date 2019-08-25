const { update } = require('../../../database/postgREST/diner');

module.exports = {
    dinerUpdate: async (_, { input }) => {
        return await update(input);
    }
}