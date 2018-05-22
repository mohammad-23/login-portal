const express = require('express');
const hbs = require('hbs');
const path = require('path');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

const {User} = require('./models/User');
//const {checkUserName, checkEmail} = require('./helper/userHelper');
const userHelper = require('./helper/userHelper');

const port = process.env.PORT || 3000;

var app = express();

mongoose.connect('mongodb://localhost/login-portal')
    .then(() => console.log('Mongoose Connected'));
mongoose.Promise = global.Promise;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

//BODY-PARSER Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//EXPRESS-SESSION-MIDDLEWARE
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

app.use(flash());

//Global-Variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

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

app.post('/signup', async (req, res) => {
    let errors = [];
    //    console.log(req.body);
    if (req.body.password !== req.body.password2) {
        errors.push({
            text: 'Passwords do not match'
        });
    };

    if (req.body.password.length < 6) {
        errors.push({
            text: 'Password should be atleast 6 characters long'
        });
    };

    if (!req.body.username) {
        errors.push({
            text: 'Username is required'
        });
    };

    let checkName = await userHelper.checkUserName(req.body.username);
    if (checkName) {
        errors.push({text: 'Username is already registered'});
    };

    let checkMail = await userHelper.checkEmail(req.body.email);
    if (checkMail) {
        errors.push({text: 'This Email is already registered'});
    };

    if (errors.length > 0) {
        return res.render('signup.hbs', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            password2: req.body.password2
        });
    }
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
            res.redirect('/welcome');
        });
    });
});


app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});

//else {
//            User.findOne({
//                    email: req.body.email
//                })
//                .then((user) => {
//                        if (user) {
//                            req.flash('error_msg', 'This Email is already registered');
//                            res.redirect('/');
//                        } else {
//                            User.findOne({
//                                    username: req.body.username
//                                })
//                                .then((user) => {
//                                        if (user) {
//                                            req.flash('error_msg', 'This Username is already in use');
//                                            res.redirect('/signup');
//                                        } else {})
//                                    //                        .catch((e) => {
//                                    //                            console.log(e);
//                                    //                        });
//                                }
//                        })
//                    //            .catch((e) => {
//                    //                console.log(e);
//                    //            });
//                }
//        });