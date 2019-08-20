const axios = require('axios');

module.exports = {
  byParam: (key, value) => {
    try {
      return axios.get(process.env.POSTGRES_URL + `/reviews?${key}=eq.${encodeURIComponent(value)}&limit=1000`)
        .then((res) => res.data)
        .catch((error) => [{
          error: error.message,
          trace: error.stack,
          msg: 'Error in execution'
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
      return axios.get(process.env.POSTGRES_URL + `/reviews`)
        .then((res) => res.data)
        .catch((error) => [{
          error: error.message,
          trace: error.stack,
          msg: 'Error in execution'
        }])
    } catch (error) {
      return [{
        error: error.msg,
        trace: error.trace,
        msg: 'Error in execution'
      }]
    }
  },
  withQuery: (query) => {
    try {
      return axios.get(process.env.POSTGRES_URL + `/reviews?${encodeURIComponent(query)}`)
        .then((res) => res.data)
        .catch((error) => [{
          error: error.message,
          trace: error.stack,
          msg: 'Error in execution'
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
      return axios.patch(process.env.POSTGRES_URL + '/reviews', {
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
          msg: 'Error in execution'
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
      return axios.post(process.env.POSTGRES_URL + '/reviews', {
        headers: {
          Prefer: 'return=representation',
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
  }
};