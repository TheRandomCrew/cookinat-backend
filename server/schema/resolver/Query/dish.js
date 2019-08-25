const { byParam, all } = require('../../../database/postgREST/dish');

module.exports = {
    dish: async (_, { dish_id }) => {
        return await byParam('dish_id', dish_id);
    },
    dishesByCook: async (_,{cook_id})=>{
        return await byParam('cook_id', cook_id);
    },
    dishesByReview: async (_,{review})=>{
        return await byParam('review', review);
    },
    dishes: async (_, { }) => {
        return await all();
    }
}