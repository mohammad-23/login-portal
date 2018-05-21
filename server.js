const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

var app = express();
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/login-portal')
    .then(() => console.log('Mongoose Connected'))
    .catch(e => console.log(e));


const {
    User
} = require('./models/User');
//      mongoose.model('users');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//BODY-PARSER Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('login.hbs');
});

app.get('/signup', (req, res) => {
    res.render('signup.hbs');
});

app.get('/welcome', (req, res) => {
    res.render('welcome.hbs');
});

app.get('/about', (req, res) => {
    res.render('about.hbs');
});

app.post('/signup', (req, res) => {
    let errors = [];
    console.log(req.body);
    if (req.body.password !== req.body.password2) {
        errors.push({
            text: 'Passwords do not match'
        });
    }

    if (req.body.password.length < 6) {
        errors.push({
            text: 'Password should be atleast 6 characters long'
        });
    };
    
    if(!req.body.username) {
        errors.push({
            text: 'Username-is-required'
        });
    } ;

    if (errors.length > 0) {
       return res.render('signup.hbs', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            password2: req.body.password2
        });
    } else {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save();
                console.log(newUser);
                res.redirect('/welcome');
                
            });
        });
    };
});


app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});
