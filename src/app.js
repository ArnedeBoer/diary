const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const DIST_DIR = path.join(__dirname, '../public');

app.use(express.static(DIST_DIR));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./../server/routes')(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(8080, () => {
    console.log('server started at 8080');
});
