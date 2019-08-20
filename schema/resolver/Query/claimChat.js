const { byParam } = require('../../../database/postgREST/claimChat');

module.exports = {
    claimChatsByDiner: async (_, { diner_id }) => {
        return await byParam('diner_id', diner_id);
    },
    claimChatsByCook: async (_, { cook_id }) => {
        return await byParam('cook_id', cook_id);
    },
    claimChatsByReservation: async (_, { reservation_id }) => {
        return await byParam('reservation_id', reservation_id);
    }
}