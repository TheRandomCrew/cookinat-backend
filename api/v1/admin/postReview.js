const { create } = require('../../../database/postgREST/review');
const responseMsgs = require('../util/responseMessages');

module.exports = async (req, res) => {

    try {
        const {
            reservation_id,
            food,
            service,
            presentation,
            overall_experience,
            comment,
            attachment,
            service_went_fully,
            review_text,
            disabled,
            reasons
        } = req.body;

        const review = await create({
            reservation_id,
            food,
            service,
            presentation,
            overall_experience,
            comment,
            attachment,
            service_went_fully,
            review_text,
            disabled,
            reasons
        });
        if (!review) {
            throw Error('There was a problem creating review on DB. Please try again or contact support.')
        }
        return res.status(201).send(responseMsgs[201]);
    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{error: error.message, trace: error.trace}]
        });
    }
};