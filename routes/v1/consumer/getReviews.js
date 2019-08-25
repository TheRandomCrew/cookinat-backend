const { all } = require('../../../server/database/postgREST/review');
const responseMsgs = require('../util/responseMessages');

module.exports = async (req, res) => {
    try {

        const reviews = await all()
        if (!reviews) {
            throw Error('There was a problem getting reviews on DB. Please try again or contact support.')
        }
        return res.status(200).json({
            ...responseMsgs[200],
            data: reviews
        })
    } catch (error) {
        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{ error: error.message, trace: error.trace }]
        });
    }
};