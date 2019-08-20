const { byParam } = require('../../../database/postgREST/cook');
const responseMsgs = require('../util/responseMessages');

module.exports = async (req, res) => {

    try {
        const { cook_id } = req.params;
        const cook = await byParam('cook_id', cook_id);
        if(!cook[0].cook_id){
            return res.status(404).json({
                ...responseMsgs[404],
                errors: cook
            })
        }
        return res.status(200).json({
            ...responseMsgs[200],
            data: cook
        })

    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{ error: error.message, trace: error.trace }]
        });
    }
};