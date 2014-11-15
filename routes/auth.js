var User = require('../models/User');
var LoginData = require('../models/LoginData');
var buildSchema = require('../models/jt-form-schema.js').buildSchema;
var loginSchema = buildSchema(LoginData);
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

/*
function login(req, res, next) {
    var user = User.from(req.body);
    userStore.save(user)
        .then(function() {
            res.redirect('/users/' + encodeURIComponent(user.id));
        })
        .then(null, function(err) {

            next(err);
        });

}
*/


module.exports = function(router, buildModel, passport) {
    userStore = buildModel(User);

    var loginMW = passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: 'Credentials incorret'
    });

    router.get('/login', loginPage);
    router.post('/login', loginMW);
    return router;
};

module.exports.loginStrategy = function(username, password, done) {
    
    userStore.get(username)
        .then(function(user) {

            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            
            if (user.password !== password) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }

            return done(null, user);
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
