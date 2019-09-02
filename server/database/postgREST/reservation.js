const axios = require('axios');

/** @module server/database/postgREST/reservation */

module.exports = {
    /**
     * @function byParam
     * @description Request to an external service to consult an especific reservation
     * 
     * @param {String} key Field to consult
     * @param {String} value Value of the especified field
     * @returns Returns a promise, if the key value matches with a row's field in DB, it will return an object with the reservation found
     *          if there are no matches it will return an empty object
     *          if there is an error it will return an error object
     */
    byParam: (key, value) => {
        try {
            return axios.get(process.env.POSTGRES_URL + `/reservations?${key}=eq.${value}&limit=1000`)
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
     * @description Request to an external service to consult all existing reservations
     * 
     * @returns Returns a promise, if the request is succesful returns an object with all reservations data
     *          if there is an error in the request it will return an error object
     */
    all: () => {
        try {
            return axios.get(process.env.POSTGRES_URL + `/reservations`)
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
     * @description Request to an external service to update a reservation data...
     * WARNING: DOESN'T WORKS UPDATES ALL EXISTING PAYMENTS WITH THE SAME DATA
     * @param {JSON} input object with update reservation data
     * @returns Returns a promise, if the request is succesful returns an object with the updated reservation data
     *          if there is an error in the request it will return an error object
     */
    update: (input) => {
        try {
            const {
                diner_id,
                cook_id,
                guests,
                dishes,
                client_order,
                cook_comment,
                priority,
                comment,
                place,
                when,
                status,
                staff_id
            } = input;
            return axios({
                    method: 'PATCH',
                    url: process.env.POSTGRES_URL + '/reservations',
                    headers: {
                        Prefer: 'return=representation',
                    },
                    data: {
                        diner_id,
                        cook_id,
                        guests,
                        dishes,
                        client_order,
                        cook_comment,
                        priority,
                        comment,
                        place,
                        when,
                        status,
                        staff_id
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
     * @description Request to an external service to create a new reservation
     *
     * @param {JSON} input object with new reservation data
     * @returns Returns a promise, if the request is succesful returns an object with the new reservation data
     *          if there is an error in the request it will return an error object
     */
    create: (input) => {
        try {
            const {
                diner_id,
                cook_id,
                guests,
                dishes,
                client_order,
                cook_comment,
                priority,
                comment,
                place,
                when,
                status,
                staff_id
            } = input;
            return axios({
                    method: 'POST',
                    url: process.env.POSTGRES_URL + '/reservations',
                    headers: {
                        Prefer: 'return=representation',
                    },
                    data: {
                        diner_id,
                        cook_id,
                        guests,
                        dishes,
                        client_order,
                        cook_comment,
                        priority,
                        comment,
                        place,
                        when,
                        status,
                        staff_id
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