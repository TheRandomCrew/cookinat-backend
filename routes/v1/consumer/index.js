const express = require('express');
let consumerRouter = express.Router();

const getDataSlug = require('./getDataSlug');

consumerRouter.get('/cook/all'                           ,getDataSlug);
consumerRouter.get('/cook/:cook_id'                      ,getDataSlug);

consumerRouter.get('/dish/all'                           ,getDataSlug);
consumerRouter.get('/dish/:dish_id'                      ,getDataSlug);
consumerRouter.get('/dish/cook/:cook_id'                 ,getDataSlug);

consumerRouter.get('/payment/all'                        ,getDataSlug);
consumerRouter.get('/payment/:payment_id'                ,getDataSlug);
consumerRouter.get('/payment/buyer/:buyer_id'            ,getDataSlug);
consumerRouter.get('/payment/receiver/:user_id'          ,getDataSlug);

consumerRouter.get('/reservation/all'                    ,getDataSlug); 
consumerRouter.get('/reservation/:reservation_id'        ,getDataSlug);
consumerRouter.get('/reservation/diner/:user_id'         ,getDataSlug);
consumerRouter.get('/reservation/cook/:cook_id'          ,getDataSlug);

consumerRouter.get('/review/all'                         ,getDataSlug);
consumerRouter.get('/review/:review_id'                  ,getDataSlug);
consumerRouter.get('/review/user/:user_id'               ,getDataSlug);
consumerRouter.get('/review/reservation/:reservation_id' ,getDataSlug);

module.exports = consumerRouter;