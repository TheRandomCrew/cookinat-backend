const { byParam, all } = require('../../../database/postgREST/claim');

module.exports = {
  claims: async () => {
    return await all();
  },
  claimsByDiner: async (_parent, { diner_id }) => {
    return await byParam('diner_id', diner_id);
  },
  claimsByStatus: async (_parent, { status }) => {
    return await byParam('status', status);
  },
  claimsByReservation: async (_parent, { reservation_id }) => {
    return await byParam('reservation_id', reservation_id);
  },
  claim: async (_parent, { claim_id }) => {
    return await byParam('claim_id', claim_id);
  }
};