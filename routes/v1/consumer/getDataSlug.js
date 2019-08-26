const responseMsgs = require('../util/responseMessages');
const logger = require('../../../server/util/logger');

module.exports = async(req, res) => {
    const {varMain, varFind, valMain} = getParam(req)
    const { all, byParam } = require(`../../../server/database/postgREST/${varMain}`);
    logger.info(`----- ${JSON.stringify(varMain)} && ${varFind} $$ ${valMain} ---- `)    

    try {
        
        let nameData = [];
        valMain === null ?(
            nameData = await all()
            ):(
            nameData = await byParam(`${varFind}`,valMain)
        )

        if (!nameData) {
            throw Error(`There was a problem getting ${nameData} on DB. Please try again or contact support.`)
        }
        return res.status(200).json({
            ...responseMsgs[200],
            data: [nameData]
        })
    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{error: error.message, trace: error.trace}]
        });
    }
};

function getParam(req){
    const notArray = req.url.split('/');
    const { params } = req;
    
    if(params && Object.keys(params).length !== 0 ){
        logger.error(params)
        if(notArray.length === 3){
            const dataParams = {
                varMain: Object.keys(params)[0].split('_')[0],
                varFind:`${ notArray[notArray.length - 2]}_id`,
                valMain: params[Object.keys(params)[0]]
            }
            return dataParams
        }
        else if(notArray.length === 4){
            const dataParams = {
                varMain:notArray[notArray.length - 3],
                varFind:`${notArray[notArray.length - 2]}_id`,
                valMain:params[Object.keys(params)[0]]
            }
            if(notArray[notArray.length - 2] === 'buyer') dataParams.varFind = 'buyer';
            if(notArray[notArray.length - 2] === 'receiver') dataParams.varFind = 'receiver';
            return dataParams
        }
        else{
            logger.error(`-----Error in the process for uri------`)    
        }
    }
    else if(!(/^\+?(0|[1-9]\d*)$/.test(notArray[notArray.length - 1]))){            
        if(notArray[notArray.length - 1] === 'all'){
            const dataParams = {
                varMain:notArray[notArray.length - 2] ,
                varFind:`${notArray[notArray.length - 2] }_id`,
                valMain:null,
            }
            return dataParams;
        }
    }
    else{
        logger.error(`-----Error in the process for uri------`)
    }

}