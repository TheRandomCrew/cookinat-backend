const express = require('express');
const path = require('path');
const versionController = require('./version');
const system = require('./system');
const logger = require('../server/util/logger');
const diner = require('../server/database/postgREST/user');

module.exports = (server) => {
    try {
        /** Root route */
        server.get('/', async function(_, res) {

            //ESTO LO USE PARA PROBAR LAS FUNCIONES DE DATABASE
            /* let input = {
                email: 'y@gmail.com',
                password: '12345',
                first_name: 'Pedroo',
                last_name: 'Veraa',
                nickname: '',
                avatar: '',
                phone_number: '',
                ssn: '113-11-2001',
                certification_photo: '',
                instagram: ''

            }; */
            let ck;
            //ck = await diner.all();
            //ck = await diner.withQuery('hola');
            //ck = await diner.create(input);
            //ck = await diner.update(input);
            //ck = await diner.findByEmail('pedro@gmail.com');

            /* let inp = {
                first_name: first_name,
                last_name,
                email,
                password,
                phone_number,
                nickname,
                avatar,
                push,
                email_notification,
                sms_notification,
                updates_notification,
                promotionals_notification,
                is_diner_locked,
                is_cook_locked,
                ssn,
                certification_photo,
                instagram,
                bio,
                video,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                sunday,
                work_holidays,
                last_payoff_method,
                last_payment_method,
                other
            } = ck[0]; */

            //ck = await diner.update('email', 'gerardo@gmail.com', inp);
            //ck = await diner.findById('36');
            //ck = await diner.remove('email', 'pedro@gmail.com');
            //ck = await diner.byParam('email', 'israellaguan@gmail.com');
            //console.log(ck);
            //res.json(JSON.stringify(ck));

            res.sendFile('/index.html', { root: path.join(__dirname, '../webpage') });
        });
        /** Use Static files */
        server.use(express.static(path.join(__dirname, '../webpage')));
        /** Route for systems options */
        server.use('/', system)
            /** Route for apis */
        server.use('/api', versionController);

    } catch (error) {
        logger.error(error)
    }
};