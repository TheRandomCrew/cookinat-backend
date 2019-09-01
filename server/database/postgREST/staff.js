const axios = require('axios');

module.exports = {
    /**
     * byParam(key,value);
     * Request to an external service to consult an especific staff
     * 
     * @param {*} key Field to consult
     * @param {*} value Value of the especified column
     * @returns Returns a promise, if the key value matches with a row's field in DB, it will return an object with the staff found
     *          if there are no matches it will return an empty object
     *          if there is an error it will return an error object
     */
    byParam: (key, value) => {
        try {
            return axios.get(process.env.POSTGRES_URL + `/staffs?${key}=eq.${value}&limit=1000`)
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
     * findByEmail(value);
     * Request to an external service to consult an especific staff based on the email field
     * 
     * @param {*} value Value of the email
     * @returns Returns a promise, if the value matches with an email in DB, it will return an object with the staff found
     *          if there are no matches it will return an empty object
     *          if there is an error it will return an error object
     */
    findByEmail: (value) => {
        try {
            return axios.get(process.env.POSTGRES_URL + `/staffs?email=eq.${value}`)
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
     * update(key,value,input);
     * Request to an external service to update an especific staff 
     * NOTE: IF THERE ARE NO MATCHES WITH THE KEY VALUE UN DB IT WILL RETURN AN ERROR
     * @param {*} key Field
     * @param {*} value Value of the especified field
     * @param {*} input Object with the update staff data
     * @returns Returns a promise, if the request is succesful returns an object with the updated staff data
     *          if there is an error in the request it will return an error object
     */
    update: (key, value, input) => {
        try {
            const {
                first_name,
                last_name,
                email,
                password,
                //role,
                phone_number,
                //nickname,
                avatar,
                other
            } = input;
            return axios({
                    method: 'PATCH',
                    url: process.env.POSTGRES_URL + '/staffs?' + key + '=eq.' + value,
                    headers: {
                        Prefer: 'return=representation',
                    },
                    data: {
                        first_name,
                        last_name,
                        email,
                        password,
                        //role,
                        phone_number,
                        //nickname,
                        avatar,
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
     * create(input);
     * Request to an external service to create a new staff
     *
     * @param {*} input object with new staff data
     * @returns Returns a promise, if the request is succesful returns an object with the new staff data
     *          if there is an error in the request it will return an error object
     */
    create: (input) => {
        try {
            const {
                first_name,
                last_name,
                email,
                password,
                //role,
                phone_number,
                //nickname,
                avatar,
                other
            } = input;
            return axios({
                    method: 'POST',
                    url: process.env.POSTGRES_URL + '/staffs',
                    headers: {
                        Prefer: 'return=representation',
                    },
                    data: {
                        first_name,
                        last_name,
                        email,
                        password,
                        //role,
                        phone_number,
                        //nickname,
                        avatar,
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
     * all();
     * Request to an external service to consult all existing staffs
     * 
     * @returns Returns a promise, if the request is succesful returns an object with all staffs data
     *          if there is an error in the request it will return an error object
     */
    all: () => {
        try {
            return axios.get(process.env.POSTGRES_URL + `/staffs`)
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