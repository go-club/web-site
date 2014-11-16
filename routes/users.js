'use strict';
var auth = require('./auth');
var bcrypt = require('bcrypt');

var User = require('../models/User');
var buildSchema = require('../models/jt-form-schema.js').buildSchema;
var userFormSchema = buildSchema(User);
var userStore;

function users(req, res, next) {
    userStore.all()
        .then(function(users) {
            res.renderTruth('users', users);
        })
        .then(null, next);
}

function editUser(req, res, next) {
    userStore.get(req.params.id)
        .then(function(user) {
            res.renderTruth('editUser', {
                model: user,
                schema: userFormSchema(user)
            });

        })
        .then(null, next);

}


function deleteUser(req, res, next) {
    userStore.delete(req.params.id)
        .then(function() {
            res.redirect('/users/');

        })
        .then(null, next);

}

function changeUser(actualUser, newUser) {
    var changes = {};
    Object.keys(newUser).forEach(function(name) {
        changes[name] = User.props[name].from(newUser[name]);
    });
    actualUser = actualUser.set(changes);
    return userStore.save(actualUser);
}

function saveUser(req, res, next) {
    var data = userFormSchema.from(req.body);

    userStore.get(data.id)
        .then(function(user) {

            if (!user) {
                return new Promise(function (resolve, reject){
                    bcrypt.hash('password', 10, function(err, hash) {
                        if (err) {
                            return reject(err);
                        }

                        user = new User({
                            id: 'newUser',
                            password: hash,
                            email: 'a@b.c',
                            registered: new Date()
                        });

                        resolve(changeUser(user, data));
                    });
                        
                });
                
            }

            return changeUser(user, data);


        })

    .then(function() {
        res.redirect('/users/' + encodeURIComponent(data.id));

    })

    .then(null, function(err) {

        next(err);
    });

}

function newUser(req, res) {
    var user = new User({
        id: 'newUser',
        password: 'password',
        email: 'a@b.c',
        registered: new Date()
    });

    res.renderTruth('editUser', {
        model: user,
        schema: userFormSchema(user)
    });

}



module.exports = function(router, buildModel) {
    userStore = buildModel(User);

    router.get('/new', auth.authorize, newUser);
    router.get('/', auth.authorize, users);
    router.get('/:id', auth.authorize, editUser);
    router.post('/:id', auth.authorize, saveUser);
    router.post('/delete/:id', auth.authorize, deleteUser);
    return router;
};
