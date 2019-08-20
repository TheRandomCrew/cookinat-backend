const {claimCreate}=require('./claim');
const {
    cookUpdate
} = require('./cook');
const {
    dinerUpdate,
}= require('./diner');
const {
    dishCreate,
    dishUpdate,
    dishDisable
} = require('./dish');
const {paymentIssue}=require('./payment');
const {
    reservationIssue,
    reservationUpdate
} = require('./reservation');
const {
    reviewCreate,
    reviewToggle
} = require('./review');

module.exports = {
    claimCreate,
    cookUpdate,
    dinerUpdate,
    dishCreate,
    dishUpdate,
    dishDisable,
    paymentIssue,
    reservationIssue,
    reservationUpdate,
    reviewCreate,
    reviewToggle
}