const { update, create } = require('../../../database/postgREST/reservation');

module.exports = {
    reservationIssue: async (_, { input }) => {
		return await create(input);
	},
    reservationUpdate: async (_, { input }) => {
        return await update(input);
    }
}