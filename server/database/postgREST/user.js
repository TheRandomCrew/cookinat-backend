const axios = require('axios');

/** @module server/database/postgREST/user */

module.exports = {
    /**
     * @function byParam
     * @description Request to an external service to consult an specific user
     * 
     * @param {String} key Field to consult
     * @param {String} value Value of the specified field
     * @returns Returns a promise, if the key value matches with a row's field in DB, it will return an object with the user found
     *          if there are no matches it will return an empty object
     *          if there is an error it will return an error object
     */
    byParam: (key, value) => {
        try {
            return axios.get(process.env.POSTGRES_URL + `/users?${key}=eq.${value}&limit=1000`)
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
     * @function findById
     * @description Request to an external service to consult an specific user based on the user_id field
     * 
     * @param {String} value Value of the id
     * @returns Returns a promise, if the value matches with an id in DB, it will return an object with the user found
     *          if there are no matches it will return an empty object
     *          if there is an error it will return an error object
     */
    findById: (value) => {
        try {
            return axios.get(process.env.POSTGRES_URL + `/users?user_id=eq.${value}`)
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
     * @function findByEmail
     * @description Request to an external service to consult an specific user based on the email field
     * 
     * @param {String} value Value of the email
     * @returns Returns a promise, if the value matches with an email in DB, it will return an object with the user found
     *          if there are no matches it will return an empty object
     *          if there is an error it will return an error object
     */
    findByEmail: (value) => {
        try {
            return axios.get(process.env.POSTGRES_URL + `/users?email=eq.${value}`)
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
     * @function update
     * @description Request to an external service to update an specific user... 
     * NOTE: IF THERE ARE NO MATCHES WITH THE KEY VALUE UN DB IT WILL RETURN AN ERROR
     * @param {String} key Field to consult
     * @param {String} value Value of the specified field
     * @param {JSON} input Update data
     * @returns Returns a promise, if the request is succesful returns an object with the updated user data
     *          if there is an error in the request it will return an error object
     */
    update: (key, value, input) => {
        try {
            const {
                first_name,
                last_name,
                email,
                password,
                phone_number,
                nickname,
                avatar,
                push,
                email_notification,
                sms_notification,
                updates_notification,
                promotionals_notification,
                is_diner_locked,
                is_cook_locked,
                ssn,
                certification_photo,
                instagram,
                bio,
                video,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                sunday,
                work_holidays,
                last_payoff_method,
                last_payment_method,
                other
            } = input;
            return axios({
                    method: 'PATCH',
                    url: process.env.POSTGRES_URL + '/users?' + key + '=eq.' + value,
                    headers: {
                        Prefer: 'return=representation',
                    },
                    data: {
                        first_name,
                        last_name,
                        email,
                        password,
                        phone_number,
                        nickname,
                        avatar,
                        push,
                        email_notification,
                        sms_notification,
                        updates_notification,
                        promotionals_notification,
                        is_diner_locked,
                        is_cook_locked,
                        ssn,
                        certification_photo,
                        instagram,
                        bio,
                        video,
                        monday,
                        tuesday,
                        wednesday,
                        thursday,
                        friday,
                        saturday,
                        sunday,
                        work_holidays,
                        last_payoff_method,
                        last_payment_method,
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
     * @description Request to an external service to create a new user
     *
     * @param {JSON} input object with new user data
     * @returns Returns a promise, if the request is succesful returns an object with the new user data
     *          if there is an error in the request it will return an error object
     */
    create: (input) => {
        try {
            const {
                first_name,
                last_name,
                email,
                password,
                phone_number,
                nickname,
                avatar,
                push,
                email_notification,
                sms_notification,
                updates_notification,
                promotionals_notification,
                is_diner_locked,
                is_cook_locked,
                ssn,
                certification_photo,
                instagram,
                bio,
                video,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                sunday,
                work_holidays,
                last_payoff_method,
                last_payment_method,
                other
            } = input;
            return axios({
                    method: 'POST',
                    url: process.env.POSTGRES_URL + '/users',
                    headers: {
                        Prefer: 'return=representation',
                    },
                    data: {
                        first_name,
                        last_name,
                        email,
                        password,
                        phone_number,
                        nickname,
                        avatar,
                        push,
                        email_notification,
                        sms_notification,
                        updates_notification,
                        promotionals_notification,
                        is_diner_locked,
                        is_cook_locked,
                        ssn,
                        certification_photo,
                        instagram,
                        bio,
                        video,
                        monday,
                        tuesday,
                        wednesday,
                        thursday,
                        friday,
                        saturday,
                        sunday,
                        work_holidays,
                        last_payoff_method,
                        last_payment_method,
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
     * @function remove
     * @description Request to an external service to delete an specified user
     *
     * @param {String} key Field to consult
     * @param {String} value Value of the specified field
     * @returns Returns a promise, if the request is succesful returns an object with the deleted user data
     *          if there are no matches in DB it returns an empty array
     *          if there is an error in the request it will return an error object
     */
    remove: (key, value) => {
        try {
            return axios({
                    method: 'DELETE',
                    url: process.env.POSTGRES_URL + '/users?' + key + '=eq.' + value,
                    headers: {
                        Prefer: 'return=representation',
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
     * @description Request to an external service to consult all existing users
     * 
     * @returns Returns a promise, if the request is succesful returns an object with all users data
     *          if there is an error in the request it will return an error object
     */
    all: () => {
        try {
            return axios.get(process.env.POSTGRES_URL + `/users`)
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
    }
}