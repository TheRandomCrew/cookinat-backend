const { update, create } = require('../../../database/postgREST/user');

module.exports = {
    userCreate: async (_, { input }) => {
        return await create(input);
    },
	userChangeContact: async (_, { input }) => {
        return await update(input);
    },
	userChangeEmail: async (_, { input }) => {
        return await update(input);
    },
	userChangePassword: async (_, { input }) => {
        return await update(input);
    }
}