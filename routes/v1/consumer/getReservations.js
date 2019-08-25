const { all } = require('../../../server/database/postgREST/reservation');
const responseMsgs = require('../util/responseMessages');

module.exports =async(req, res) => {
    try {

        const reservations = await all()
        if (!reservations) {
            throw Error('There was a problem getting reservation on DB. Please try again or contact support.')
        }
        return res.status(200).json({
            ...responseMsgs[200],
            data: reservations
        })
    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{error: error.message, trace: error.trace}]
        });
    }
};