const { all } = require('../../../server/database/postgREST/payment');
const responseMsgs = require('../util/responseMessages');

module.exports = async(req, res) => {
    try {
        
       const payment = await all();
        if (!payment) {
            throw Error('There was a problem getting payment on DB. Please try again or contact support.')
        }
        return res.status(200).json({
            ...responseMsgs[200],
            data: [payment]
        })
    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{error: error.message, trace: error.trace}]
        });
    }
};