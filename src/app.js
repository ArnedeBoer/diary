const express = require('express');
const app = express();

app.get('/diary', (req, res) => {
    const pages = [
        {
            date: '2017-05-05',
            text: 'extra text'
        }
    ];

    res.send(pages);
});

app.listen(8080, () => {
    console.log('server started at 8080');
});
