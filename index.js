const express = require('express')
const app = express()
const port = 3000
const httpRequest = require('request');
const q = require('q');
const rp = require('request-promise-native');

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
    });
});



app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})