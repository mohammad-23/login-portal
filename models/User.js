const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
mongoose.Promise = global.Promise;

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
    },
    username: {
        type: String,
        required: true,
        minLength: 1
    },
    email: {
        type: String,
        required: true,
        minLength: 1,
        trim: true,
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


const User = mongoose.model('users', UserSchema);
module.exports = {
    User
}
