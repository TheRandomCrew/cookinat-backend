const { create } = require('../../../database/postgREST/claim');

module.exports = {
	claimCreate: async (_, { input }) => {
		return await create(input);
	}
}