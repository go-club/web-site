'use strict';

var mongoose = require('mongoose');
module.exports = connectMongo;

var User = require('./User');

function connectMongo() {
    mongoose.connect('mongodb://localhost/go-club');

    var db = connectMongo.db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', checkAdminUser);

}


function checkAdminUser() {
    User.count({
        admin: true
    }, saveAdminUser);

}


function saveAdminUser(err, adminsCount) {
    if (err) {
        return console.error(err);
    }

    if (adminsCount > 0) {
        return console.log('admin user already saved');
    }

    var parroit = new User({
        name: 'admin',
        password: 'secret',
        admin: true,
        confirmed: true,
        email: 'andrea.parodi@ebansoftware.net'
    });

    parroit.save(function(err) {
        if (err) {
            return console.error(err);
        }
        console.log('saved admin user');
    });
}
