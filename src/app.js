const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
const baseUrl = 'http://localhost:8080';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./../server/routes')(app);

app.get('/diary', (req, res) => {
    request(`${baseUrl}/api/page/all`, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.send({ pages: JSON.parse(body) });
        }
    });
});


app.listen(8080, () => {
    console.log('server started at 8080');
});
