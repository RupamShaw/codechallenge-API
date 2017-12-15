const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const PORT = '8080';
const peopleRoutes = require('./people');

// Write your code here
app.use(bodyParser.urlencoded({ extended: true }));
peopleRoutes(app);

app.listen(PORT, function () {
    console.log('server is up on port ' + PORT)
});

