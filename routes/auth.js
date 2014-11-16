'use strict';

var bcrypt = require('bcrypt');
var User = require('../models/User');
var LoginData = require('../models/LoginData');
var ChangePassword = require('../models/ChangePassword');
var buildSchema = require('../models/jt-form-schema.js').buildSchema;
var loginSchema = buildSchema(LoginData);
var changePasswordSchema = buildSchema(ChangePassword);
var userStore;


function loginPage(req, res, next) {
    var loginData = new LoginData({
        username: 'newUser',
        password: 'password'
    });

    res.renderTruth('login', {
        model: loginData,
        schema: loginSchema(loginData)
    });


}

function logout(req, res) {
    req.logout();
    res.redirect('/');
}

function changePasswordPage(req, res) {
    var changePassword = new ChangePassword({
        password: 'password',
        confirmPassword: 'anotherPassword'
    });

    res.renderTruth('changePassword', {
        model: changePassword,
        schema: changePasswordSchema(changePassword)
    });

}


function changePassword(req, res, next) {
    var data = changePasswordSchema.from(req.body);
    if (data.password !== data.confirmPassword) {
        req.flash('error', 'Passwords do not match.');
        return res.renderTruth('changePassword', {
            model: data,
            schema: changePasswordSchema(changePassword)
        });
    }



    bcrypt.hash(data.password, 10, function(err, hash) {
        if (err) {
            return (next(err));
        }
        userStore.get(req.user.id)
            .then(function(user) {
                user = user.set('password',hash);
                return userStore.save(user);
            })
            .then(function() {
                req.flash('error', 'Your password has been changed.');
                res.redirect('/auth/change-password');

            })

        .then(null, next);


    });




}


module.exports = function(router, buildModel, passport) {
    userStore = buildModel(User);

    var loginMW = passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: 'Credentials incorret'
    });

    router.get('/login', loginPage);
    router.get('/change-password', authorize, changePasswordPage);
    router.post('/change-password', authorize,changePassword);
    router.post('/login', loginMW);
    router.get('/logout', authorize, logout);

    return router;
};




function authorize(req, res, next) {
    if (!req.user) {
        req.flash('error', 'You are not authorized to view this page, please login');
        res.redirect('/auth/login');
    } else {
        next();
    }
}

module.exports.authorize = authorize;
module.exports.loginStrategy = function(username, password, done) {

    userStore.get(username)
        .then(function(user) {
            

            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
           
           
            bcrypt.compare(password, user.password, function(err, res) {
                if (err) {
                    return done(err);
                }

                if (res) {
                    return done(null, user);        
                }

                return done(null, false, {
                    message: 'Incorrect password.'
                });
            });


            
        })

    .then(null, done);

};

module.exports.serialization = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        userStore.get(id)
            .then(function(user) {
                if (!user) {
                    return done(new Error('Cannot find user ' + id));
                }
                done(null, user);
            })
            .then(null, done);

    });
};
