const { byParam } = require('../../../database/postgREST/payment');

module.exports = {
    payment: async (_, { payment_id }) => {
        return await byParam('payment_id', payment_id);
    },
    paymentsByStatus: async (_, { pay_status }) => {
        return await byParam('pay_status', pay_status);
    },
    paymentRequestReceipt: (_, { diner_id, reservation_id }) => {
        return 'Well done'
    }
}