'use strict';
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
module.exports = connectMongo;

var User = require('./User');
var buildModel = require('../models/jt-mongoose.js');
var userStore = buildModel(User);

function connectMongo(initUsers) {
    mongoose.connect('mongodb://localhost/go-club-6');

    var db = connectMongo.db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    return new Promise(function(resolve, reject) {
        db.once('open', function() {
            //if (initUsers) {
            checkAdminUser();
            //}

            resolve();
        });
    });


}


function checkAdminUser() {
    saveAdminUser(null, 0);

}


function saveAdminUser(err, adminsCount) {
    if (err) {
        return console.error(err);
    }

    if (adminsCount > 1) {
        return console.log('admin user already saved');
    }

    bcrypt.hash('secret', 10, function(err, hash) {
        if (err) {
            return console.log(err);
        }
        
        console.log('at init', hash);

        var parroit = new User({
            id: 'admin2',
            password: hash,
            admin: true,
            confirmed: true,
            email: 'andrea.parodi@ebansoftware.net'
        });

        userStore.save(parroit)
            .then(function() {
                console.log('saved admin user');
            })
            .then(null, function(err) {
                console.log(err);
            });
    });
}
