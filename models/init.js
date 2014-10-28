'use strict';

var mongoose = require('mongoose');
module.exports = connectMongo;

var User = require('./User');

function connectMongo(initUsers = false) {
    mongoose.connect('mongodb://localhost/go-club');

    var db = connectMongo.db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    return new Promise((resolve, reject) => {
        db.once('open', () => {
            if (initUsers) {
                checkAdminUser();    
            }
            
            resolve();
        });    
    });
    

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

    if (adminsCount > 1) {
        return console.log('admin user already saved');
    }

    var parroit = new User({
        name: 'admin2',
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
