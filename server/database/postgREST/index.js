const claim = require('./claim');
const claimChat = require('./claimChat');
const cook = require('./cook');
const diner = require('./diner');
const dish = require('./dish');
const payment = require('./payment');
const reservation = require('./reservation');
const review = require('./review');
const staff = require('./staff');
const user = require('./user');

/**  
 * Exports all database files to group all functions in just 1 object
 */
module.exports = {
    claim,
    claimChat,
    cook,
    diner,
    dish,
    payment,
    reservation,
    review,
    staff,
    user
}