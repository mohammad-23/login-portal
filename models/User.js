const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 1
    },
    email: {
        type: String,
        required: true,
        minLength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    }
    //    tokens: [{
    //        access: {
    //            type: String,
    //            required: true
    //        },
    //        token: {
    //            type: String,
    //            required: true
    //        }
    //    }]
});

//UserSchema.pre('save', function (next) {
//
//    bcrypt.genSalt(10, (err, salt) => {
//        bcrypt.hash(User.password, salt, (err, hash) => {
//            if (err) throw err;
//            newUser.password = hash;
//            newUser.save((err, user) => {
//                    if (err) {
//                        return err;
//                    }
//                })
//                .then((user) => {
//                    res.redirect('/welcome');
//                }).catch(err) => {
//                    if (err) {
//                        console.log(err);
//                    }
//                }
//        });
//    });
//    next();
//})
const User = mongoose.model('users', UserSchema);
module.exports = {
    User
}
