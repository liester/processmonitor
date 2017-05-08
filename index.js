const express = require('express')
const app = express()
const port = 3000
const httpRequest = require('request');
const q = require('q');
const rp = require('request-promise-native');
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'prododa01.eparonline.com',
    user: 'falco',
    password: ':86_c0v3r_73x45_91:',
    database: 'dev',
    port: '3306'
});

//CORS goodness
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/payfront', (request, clientReponse) => {

    var payFrontEndRequest = {
        method: 'GET',
        uri: 'https://pay.atssecured.com/static/#',
        resolveWithFullResponse: true,
        simple: false
    };

    let payFrontendStatus = {};

    rp(payFrontEndRequest).then((response) => {
        payFrontendStatus.statusCode = response.statusCode;
        clientReponse.send(JSON.stringify(payFrontendStatus));

        let params = {
            insert_by: 1,
            payload: 'HTTP Status: ' + payFrontendStatus.statusCode
        };
        //~ let query = connection.query('INSERT INTO pay_audit SET ?', params, function (error, results, fields) {
            //~ if (error) throw error;
            //~ // Neat! 
        //~ });
    }).catch((err) => {
        console.log(err.statusCode);
    });

});

app.get('/payback', (request, clientReponse) => {
    let payBackEndRequest = {
        method: 'GET',
        uri: 'https://pay.atssecured.com/ATSPayRestService/users/defaultAccountId',
        resolveWithFullResponse: true,
        simple: false
    };
    let payBackendStatus = {};

    rp(payBackEndRequest).then((response) => {
        payBackendStatus.statusCode = response.statusCode;
        clientReponse.send(JSON.stringify(payBackendStatus));
        let params = {
            insert_by: 1,
            payload: 'HTTP Status: ' + payBackendStatus.statusCode
        };
        //~ let query = connection.query('INSERT INTO pay_audit SET ?', params, function (error, results, fields) {
            //~ if (error) throw error;
            //~ // Neat! 
        //~ });
    });
});


app.get('/reportfront', (request, clientReponse) => {

    var reportFrontEndRequest = {
        method: 'GET',
        uri: 'https://reports.atssecured.com/#/',
        resolveWithFullResponse: true,
        simple: false
    };

    let reportFrontendStatus = {};

    rp(reportFrontEndRequest).then((response) => {
        reportFrontendStatus.statusCode = response.statusCode;
        clientReponse.send(JSON.stringify(reportFrontendStatus));

        let params = {
            insert_by: 1,
            payload: 'HTTP Status: ' + reportFrontendStatus.statusCode
        };
        //~ let query = connection.query('INSERT INTO pay_audit SET ?', params, function (error, results, fields) {
            //~ if (error) throw error;
            //~ // Neat! 
        //~ });
    }).catch((err) => {
        console.log(err.statusCode);
    });

});

app.get('/reportback', (request, clientReponse) => {
    let reportBackEndRequest = {
        method: 'GET',
        uri: 'https://reports.atssecured.com/authenticate/adminSession',
        resolveWithFullResponse: true,
        simple: false
    };
    let reportBackendStatus = {};

    rp(reportBackEndRequest).then((response) => {
        reportBackendStatus.statusCode = response.statusCode;
        clientReponse.send(JSON.stringify(reportBackendStatus));
        let params = {
            insert_by: 1,
            payload: 'HTTP Status: ' + reportBackendStatus.statusCode
        };
        //~ let query = connection.query('INSERT INTO pay_audit SET ?', params, function (error, results, fields) {
            //~ if (error) throw error;
            //~ // Neat! 
        //~ });
    });
});




app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})
