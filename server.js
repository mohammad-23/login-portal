const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

var app = express();
app.set('port', process.env.PORT || 3000);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/login-portal')
    .then(() => console.log('Mongoose Connected'))
    .catch(e => console.log(e));

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use(express.static(__dirname + '/Views'));

app.get('/', (req, res) => {
    res.render('login.hbs');
});

app.get('/signup', (req, res) => {
    res.render('signup.hbs');
});


app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});
