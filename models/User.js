'user strict';

var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    name: String,
    password: String,
    email: String,
    admin: Boolean,
    confirmed: Boolean
});
