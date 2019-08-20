const axios = require('axios');

const logger = require('../../util/logger');
module.exports = {
  byParam: (key, value) => {
    try {
      return axios.get(process.env.POSTGRES_URL + `/dishes?${key}=eq.${encodeURIComponent(value)}&limit=1000`)
        .then((res) => res.data)
        .catch((error) => [{
          error: error.message,
          trace: error.stack,
          method: error.config.method,
          url: error.config.url,
          msg: 'Error in query'
        }])
    } catch (error) {
      return [{
        error: error.msg,
        trace: error.trace,
        msg: 'Error in execution'
      }]
    }
  },
  all: () => {
    try {
      return axios.get(process.env.POSTGRES_URL + `/dishes`)
        .then((res) => res.data)
        .catch((error) => [{
          error: error.message,
          trace: error.stack,
          method: error.config.method,
          url: error.config.url,
          msg: 'Error in query'
        }])
    } catch (error) {
      return [{
        error: error.msg,
        trace: error.trace,
        msg: 'Error in execution'
      }]
    }
  },
  update: (input) => {
    try {
      return axios.patch(process.env.POSTGRES_URL + '/dishes', {
        headers: {
          Prefer: 'return=representation',
          accept: '*/*'
        },
        data: input
      })
        .then((res) => res.data)
        .catch((error) => [{
          error: error.message,
          trace: error.stack,
          method: error.config.method,
          url: error.config.url,
          msg: 'Error in query'
        }]);
    } catch (error) {
      return [{
        error: error.msg,
        trace: error.trace,
        msg: 'Error in execution'
      }]
    }
  },
  create: (input) => {
    try {
      return axios.post(process.env.POSTGRES_URL + '/dishes', {
        headers: {
          Prefer: 'return=representation',
          Accept: 'application/json'
        },
        data: input
      })
        .then((res) => {
          console.info(res.data)
          logger.info(res.data)
          return res.data
        })
        .catch((error) => {
          console.error(error)
          return [{
            error: error.message,
            trace: error.stack,
            method: error.config.method,
            url: error.config.url,
            msg: 'Error in query'
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