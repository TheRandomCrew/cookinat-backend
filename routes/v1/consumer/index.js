const express = require('express');
let consumerRouter = express.Router();

const getClaim              = require('./getClaim');
const getClaims             = require('./getClaims');
const getCooks              = require('./getCooks');
const getDishes             = require('./getDishes');
const getPayments           = require('./getPayments');
const getPaymentById        = require('./getPaymentById');
const getReservation        = require('./getReservation');
const getReservations       = require('./getReservations');
const getReservationByDiner = require('./getReservationByDiner');
const getReviews             = require('./getReviews');
const getReview             = require('./getReview');
const getReviewByCook       = require('./getReviewByCook');

consumerRouter.get('/claim/all'                  ,getClaims);/*empty*/
consumerRouter.get('/claim/:claim_id'            ,getClaim);

consumerRouter.get('/cook/all'                   ,getCooks);
consumerRouter.get('/dish/all'                   ,getDishes);

consumerRouter.get('/payment/all'                ,getPayments);/*empty*/
consumerRouter.get('/payment/:payment_id'        ,getPaymentById);

consumerRouter.get('/reservation/all'            ,getReservations); /*empty*/
consumerRouter.get('/reservation/diner/:user_id' ,getReservationByDiner);
consumerRouter.get('/reservation/:reservation_id',getReservation);

consumerRouter.get('/review/all'                 ,getReviews);/*empty*/
consumerRouter.get('/review/cook/:user_id'       ,getReviewByCook);
consumerRouter.get('/review/:review_id'          ,getReview);

/**
 * 
 * Create this end-point
 * /cook/:cook_id
 * /dish/:dish_id
 * /payment/:user_id
 * /review/reservation/:reservation_id
 * /review/reservation/:user_id
 * /review/:user_id
 */

module.exports = consumerRouter;