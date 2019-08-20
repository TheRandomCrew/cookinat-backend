const { byParam, all, withQuery } = require('../../../database/postgREST/review');

module.exports = {
    reviews: async (_, { }) => {
        return await all();
    },
    review: async (_, { review_id }) => {
        return await byParam('review_id', review_id);
    },
    reviewsByDiner: async (_, { diner_id }) => {
        return await byParam('diner_id', diner_id);
    },
    reviewsByReservation: async (_, { reservation_id }) => {
        return await byParam('reservation_id', reservation_id);
    },
    reviewsSearch: async (_, { query }) => {
        return await withQuery(query);
    }
}