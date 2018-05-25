if (process.env.NODE_ENV === 'production') {
    module.exports = {mongoURI: 'mongodb://mohammad:qazwsx@ds227740.mlab.com:27740/login-portal'}
} else {
    module.exports = {mongoURI: 'mongodb://localhost/login-portal'}
}