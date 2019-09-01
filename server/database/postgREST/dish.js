const axios = require('axios');
const logger = require('../../util/logger');

module.exports = {
    /**
     * byParam(key,value);
     * Request to an external service to consult an especific dish
     * 
     * @param {*} key Field to consult
     * @param {*} value Value of the especified column
     * @returns Returns a promise, if the key value matches with a row's field in DB, it will return an object with the dish found
     *          if there are no matches it will return an empty object
     *          if there is an error it will return an error object
     */
    byParam: (key, value) => {
        try {
            return axios.get(process.env.POSTGRES_URL + `/dishes?${key}=eq.${value}&limit=1000`)
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
     * all();
     * Request to an external service to consult all existing dishes
     * 
     * @returns Returns a promise, if the request is succesful returns an object with all dishes data
     *          if there is an error in the request it will return an error object
     */
    all: () => {
        try {
            return axios.get(process.env.POSTGRES_URL + `/dishes`)
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
     * update(input);
     * Request to an external service to update a dish data
     * WARNING: DOESN'T WORKS UPDATES ALL EXISTING PAYMENTS WITH THE SAME DATA
     * @param {*} input object with update dish data
     * @returns Returns a promise, if the request is succesful returns an object with the updated dish data
     *          if there is an error in the request it will return an error object
     */
    update: (input) => {
        try {
            const {
                cook_id,
                title,
                description,
                style,
                glutten_allergy,
                soy_allergy,
                milk_allergy,
                peanuts_allergy,
                shrimp_allergy,
                other_allergy,
                attachment,
                minimun_diners,
                maximum_diners,
                price,
                minimum_cancel_time,
                required_tools
            } = input
            return axios({
                    method: 'PATCH',
                    url: process.env.POSTGRES_URL + '/dishes',
                    headers: {
                        Prefer: 'return=representation',
                    },
                    data: {
                        cook_id,
                        title,
                        description,
                        style,
                        glutten_allergy,
                        soy_allergy,
                        milk_allergy,
                        peanuts_allergy,
                        shrimp_allergy,
                        other_allergy,
                        attachment,
                        minimun_diners,
                        maximum_diners,
                        price,
                        minimum_cancel_time,
                        required_tools
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
     * Request to an external service to create a new dish
     *
     * @param {*} input object with new dish data
     * @returns Returns a promise, if the request is succesful returns an object with the new dish data
     *          if there is an error in the request it will return an error object
     */
    create: (input) => {
        try {
            const {
                cook_id,
                title,
                description,
                style,
                glutten_allergy,
                soy_allergy,
                milk_allergy,
                peanuts_allergy,
                shrimp_allergy,
                other_allergy,
                attachment,
                minimun_diners,
                maximum_diners,
                price,
                minimum_cancel_time,
                required_tools
            } = input

            logger.info({
                cook_id,
                title,
                description,
                style,
                glutten_allergy,
                soy_allergy,
                milk_allergy,
                peanuts_allergy,
                shrimp_allergy,
                other_allergy,
                attachment,
                minimun_diners,
                maximum_diners,
                price,
                minimum_cancel_time,
                required_tools
            })
            return axios({
                    method: 'POST',
                    url: process.env.POSTGRES_URL + '/dishes',
                    headers: {
                        Prefer: 'return=representation',
                        "Content-Type": 'application/json'
                    },
                    data: {
                        cook_id,
                        title,
                        description,
                        style,
                        glutten_allergy,
                        soy_allergy,
                        milk_allergy,
                        peanuts_allergy,
                        shrimp_allergy,
                        other_allergy,
                        attachment,
                        minimun_diners,
                        maximum_diners,
                        price,
                        minimum_cancel_time,
                        required_tools
                    }
                })
                .then((res) => {
                    // logger.info(res.data)
                    return res.data
                })
                .catch((error) => {
                    logger.error(error.message)
                    return [{
                        error: error.message,
                        trace: error.stack,
                        method: error.config.method,
                        url: error.config.url,
                        msg: 'Query error: ' + error.response.data.message
                    }]
                });
        } catch (error) {
            return [{
                error: error.msg,
                trace: error.trace,
                msg: 'Error in execution'
            }]
        }
    }
};