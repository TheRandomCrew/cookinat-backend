const { create } = require('../../../database/postgREST/payment');

module.exports = {
    paymentIssue: async (_, { input }) => {
		return await create(input);
	}
}