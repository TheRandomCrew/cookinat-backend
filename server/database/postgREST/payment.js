const logger = require('../../util/logger')
const axios = require('axios');

/** @module server/database/postgREST/payment */

module.exports = {
    /**
     * @function byParam
     * @description Request to an external service to consult an especific payment
     * 
     * @param {String} key Field to consult
     * @param {String} value Value of the especified field
     * @returns Returns a promise, if the key value matches with a row's field in DB, it will return an object with the payment found
     *          if there are no matches it will return an empty object
     *          if there is an error it will return an error object
     */
    byParam: (key, value) => {
        try {
            return axios.get(process.env.POSTGRES_URL + `/payments?${key}=eq.${value}&limit=1000`)
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
     * @description Request to an external service to update a payment data...
     * WARNING: DOESN'T WORKS UPDATES ALL EXISTING PAYMENTS WITH THE SAME DATA
     * @param {JSON} input object with update payment data
     * @returns Returns a promise, if the request is succesful returns an object with the updated payment data
     *          if there is an error in the request it will return an error object
     */
    update: (input) => {
        try {
            const {
                receiver,
                buyer,
                comment,
                concept,
                register,
                pay_method,
                pay_status,
                other
            } = input;
            return axios({
                    method: 'PATCH',
                    url: process.env.POSTGRES_URL + '/payments',
                    headers: {
                        Prefer: 'return=representation',
                    },
                    data: {
                        receiver,
                        buyer,
                        comment,
                        concept,
                        register,
                        pay_method,
                        pay_status,
                        other
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
     * @description Request to an external service to create a new payment...
     * NOTE: IF ITS GOING TO CREATE A NEW ROW IN BD YOU SHOULDN'T SEND THE ROW ID, IT SHOULD BE AUTO_INCREMENT
     * @param {JSON} input object with new payment data
     * @returns Returns a promise, if the request is succesful returns an object with the new payment data
     *          if there is an error in the request it will return an error object
     */
    create: (input) => {
        try {
            const {
                payment_id,
                receiver,
                buyer,
                comment,
                concept,
                register,
                pay_method,
                pay_status,
                other
            } = input;
            return axios({
                    method: 'POST',
                    url: process.env.POSTGRES_URL + '/payments',
                    headers: {
                        Prefer: 'return=representation',
                    },
                    data: {
                        payment_id,
                        receiver,
                        buyer,
                        comment,
                        concept,
                        register,
                        pay_method,
                        pay_status,
                        other
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
     * @function all
     * @description Request to an external service to consult all existing payments
     * 
     * @returns Returns a promise, if the request is succesful returns an object with all payments data
     *          if there is an error in the request it will return an error object
     */
    all: () => {
        try {
            return axios.get(process.env.POSTGRES_URL + `/payments`)
                .then((res) => {
                    return res.data
                })
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
    }
};