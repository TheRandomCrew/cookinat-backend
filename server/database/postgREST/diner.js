const axios = require('axios');

/** 
 *  @module server/database/postgREST/diner
 */

module.exports = {
    /**
     * @function byParam
     * @description Request to an external service to consult an especific diner
     * 
     * @param {String} key Field to consult
     * @param {String} value Value of the especified field
     * @returns Returns a promise, if the key value matches with a row's field in DB, it will return an object with the diner found
     *          if there are no matches it will return an empty object
     *          if there is an error it will return an error object
     */
    byParam: (key, value) => {
        try {
            return axios.get(process.env.POSTGRES_URL + `/diners?${key}=eq.${value}&limit=1000`)
                .then((res) => { return res.data })
                .catch((error) => [{
                    error: error.message,
                    trace: error.stack,
                    method: error.config.method,
                    url: error.config.url,
                    msg: 'Query error: ' + error.response.data.message
                }])
        } catch (error) {
            return [{
                error: error.msg,
                trace: error.trace,
                msg: 'Error in execution'
            }]
        }
    },
    /**
     * @function all
     * @description Request to an external service to consult all existing diners
     * 
     * @returns Returns a promise, if the request is succesful returns an object with all diners data
     *          if there is an error in the request it will return an error object
     */
    all: () => {
        try {
            return axios.get(process.env.POSTGRES_URL + `/diners`)
                .then((res) => { return res.data })
                .catch((error) => [{
                    error: error.message,
                    trace: error.stack,
                    method: error.config.method,
                    url: error.config.url,
                    msg: 'Query error: ' + error.response.data.message
                }])
        } catch (error) {
            return [{
                error: error.msg,
                trace: error.trace,
                msg: 'Error in execution'
            }]
        }
    },
    /**
     * @function update
     * @description Request to an external service to update a diner data...
     * WARNING: DOESN'T WORKS CAN NOT FIND THE DINER TO UPDATE
     * @param {JSON} input object with update diner data
     * @returns Returns a promise, if the request is succesful returns an object with the updated diner data
     *          if there is an error in the request it will return an error object
     */
    update: (input) => {
        try {
            const {
                email,
                password,
                first_name,
                last_name,
                nickname,
                avatar,
                phone_number
            } = input;
            return axios({
                    method: 'PATCH',
                    url: process.env.POSTGRES_URL + '/auth_diner',
                    headers: {
                        Prefer: 'return=representation',
                    },
                    data: {
                        email,
                        password,
                        first_name,
                        last_name,
                        nickname,
                        avatar,
                        phone_number
                    }
                })
                .then((res) => { return res.data })
                .catch((error) => [{
                    error: error.message,
                    trace: error.stack,
                    method: error.config.method,
                    url: error.config.url,
                    msg: 'Query error: ' + error.response.data.message
                }]);
        } catch (error) {
            return [{
                error: error.msg,
                trace: error.trace,
                msg: 'Error in execution'
            }]
        }
    },
    /**
     * @function create
     * @description Request to an external service to create a new diner
     *
     * @param {JSON} input object with new diner data
     * @returns Returns a promise, if the request is succesful returns an object with the new diner data
     *          if there is an error in the request it will return an error object
     */
    create: (input) => {
        const {
            email,
            password,
            first_name,
            last_name,
            nickname,
            avatar,
            phone_number
        } = input;
        try {
            return axios({
                    method: 'POST',
                    url: process.env.POSTGRES_URL + '/auth_diner',
                    headers: {
                        Prefer: 'return=representation',
                    },
                    data: {
                        email,
                        password,
                        first_name,
                        last_name,
                        nickname,
                        avatar,
                        phone_number
                    }
                })
                .then((res) => { return res.data })
                .catch((error) => [{
                    error: error.message,
                    trace: error.stack,
                    method: error.config.method,
                    url: error.config.url,
                    msg: 'Query error: ' + error.response.data.message
                }]);
        } catch (error) {
            return [{
                error: error.msg,
                trace: error.trace,
                msg: 'Error in execution'
            }]
        }
    }
};