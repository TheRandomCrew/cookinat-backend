const { create } = require('../../../database/postgREST/reservation');
const responseMsgs = require('../util/responseMessages');

module.exports = async (req, res) => {
    try {
        const {
            cook_id,
            diner_id,
            guests_list_id,
            when,
            comment,
            place
        } = req.body;

        const reservation = await create({
            cook_id,
            diner_id,
            guests_list_id,
            when,
            comment,
            place
        })
        if (!reservation) {
            throw Error('There was a problem creating reservation on DB. Please try again or contact support.')
        }
        return res.status(201).send(responseMsgs[201]);
    } catch (error) {
        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{error: error.message, trace: error.trace}]
        });
    }
};