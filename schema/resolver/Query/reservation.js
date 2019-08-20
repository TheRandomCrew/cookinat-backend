const { byParam, all } = require('../../../database/postgREST/reservation');

module.exports = {
    reservations: async (_, { }) => {
        return await all();
    },
    reservation: async (_, { reservation_id }) => {
        return await byParam('reservation_id', reservation_id);
    },
    reservationsByDiner: async (_, { diner_id }) => {
        return await byParam('diner_id', diner_id);
    },
    reservationsByCook: async (_, { cook_id }) => {
        return await byParam('cook_id', cook_id);
    },
    reservationsByStatus: async (_, { status }) => {
        return await byParam('status', status);
    }
}