const { update, create } = require('../../../database/postgREST/dish');
const logger = require('../../../util/logger');
module.exports = {
    dishCreate: async (_, { input }) => {

        logger.info(input)
        console.error(input)
        return await create(input);
    },
    dishUpdate: async (_, { input }) => {
        return await update(input);
    },
    dishDisable: async (_, { input }) => {
        return await update(input);
    }
}