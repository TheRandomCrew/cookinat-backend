const {
    claims,
    claimsByDiner,
    claimsByStatus,
    claimsByReservation,
    claim
} = require('./claim');
const {
    claimChatsByDiner,
    claimChatsByCook,
    claimChatsByReservation
} = require('./claimChat');
const {
    cook,
    cooks
} = require('./cook');
const {
    diner,
    diners
} = require('./diner');
const {
    dish,
    dishesByCook,
    dishesByReview,
    dishes
} = require('./dish');
const {
    payment,
    paymentsByStatus
} = require('./payment');
const {
    reservations,
    reservation,
    reservationsByDiner,
    reservationsByCook,
    reservationsByStatus
} = require('./reservation');
const {
    reviews,
    review,
    reviewsByDiner,
    reviewsByReservation
} = require('./review');
const { user } = require('./user');

module.exports = {
    claims,
    claimsByDiner,
    claimsByStatus,
    claimsByReservation,
    claim,
    claimChatsByDiner,
    claimChatsByCook,
    claimChatsByReservation,
    cook,
    cooks,
    diner,
    diners,
    dish,
    dishesByCook,
    dishesByReview,
    dishes,
    payment,
    paymentsByStatus,
    reservations,
    reservation,
    reservationsByDiner,
    reservationsByCook,
    reservationsByStatus,
    reviews,
    review,
    reviewsByDiner,
    reviewsByReservation,
    user
}