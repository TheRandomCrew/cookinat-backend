const axios = require('axios');

/** @module server/database/postgREST/review */

module.exports = {
    /**
     * @function byParam
     * @description Request to an external service to consult an especific review
     * 
     * @param {String} key Field to consult
     * @param {String} value Value of the especified field
     * @returns Returns a promise, if the key value matches with a row's field in DB, it will return an object with the review found
     *          if there are no matches it will return an empty object
     *          if there is an error it will return an error object
     */
    byParam: (key, value) => {
        try {
            return axios.get(process.env.POSTGRES_URL + `/reviews?${key}=eq.${value}&limit=1000`)
                .then((res) => { return res.data })
                .catch((error) => [{
                    error: error.message,
                    trace: error.stack,
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
     * @description Request to an external service to consult all existing reviews
     * 
     * @returns Returns a promise, if the request is succesful returns an object with all reviews data
     *          if there is an error in the request it will return an error object
     */
    all: () => {
        try {
            return axios.get(process.env.POSTGRES_URL + `/reviews`)
                .then((res) => { return res.data })
                .catch((error) => [{
                    error: error.message,
                    trace: error.stack,
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
     * @function withQuery
     * @description Request to an external service to consult an especific review, sending an URL query...
     * WARNING: NO MATTER WHAT YOU SEND IN THE QUERY, IT RETURNS ALL REVIEW DATA IN DB
     * @param {String} query URL query
     * @returns All review data existing in DB
     */
    withQuery: (query) => {
        try {
            return axios.get(process.env.POSTGRES_URL + `/reviews?${encodeURIComponent(query)}`)
                .then((res) => res.data)
                .catch((error) => [{
                    error: error.message,
                    trace: error.stack,
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
     * @description Request to an external service to update a review data...
     * WARNING: DOESN'T WORKS UPDATES ALL EXISTING PAYMENTS WITH THE SAME DATA
     * @param {JSON} input object with update review data
     * @returns Returns a promise, if the request is succesful returns an object with the updated review data
     *          if there is an error in the request it will return an error object
     */
    update: (input) => {
        try {
            const {
                user_id,
                reservation_id,
                food,
                service,
                presentation,
                overall_experience,
                comment,
                attachment,
                service_went_fully,
                review_text,
                other
            } = input;
            return axios({
                    method: 'PATCH',
                    url: process.env.POSTGRES_URL + '/reviews',
                    headers: {
                        Prefer: 'return=representation',
                    },
                    data: {
                        user_id,
                        reservation_id,
                        food,
                        service,
                        presentation,
                        overall_experience,
                        comment,
                        attachment,
                        service_went_fully,
                        review_text,
                        other
                    }
                })
                .then((res) => res.data)
                .catch((error) => [{
                    error: error.message,
                    trace: error.stack,
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
     * @description Request to an external service to create a new review
     *
     * @param {JSON} input object with new review data
     * @returns Returns a promise, if the request is succesful returns an object with the new review data
     *          if there is an error in the request it will return an error object
     */
    create: (input) => {
        try {
            const {
                user_id,
                reservation_id,
                food,
                service,
                presentation,
                overall_experience,
                comment,
                attachment,
                service_went_fully,
                review_text
            } = input;
            return axios({
                    method: 'POST',
                    url: process.env.POSTGRES_URL + '/reviews',
                    headers: {
                        Prefer: 'return=representation',
                    },
                    data: {
                        user_id,
                        reservation_id,
                        food,
                        service,
                        presentation,
                        overall_experience,
                        comment,
                        attachment,
                        service_went_fully,
                        review_text
                    }
                })
                .then((res) => res.data)
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