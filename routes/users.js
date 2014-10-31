var express = require('express');
var router = express.Router();

var User = require('../models/User');
var buildModel = require('../models/jt-mongoose.js');
var buildSchema = require('../models/jt-form-schema.js');

var userStore = buildModel(User);
var userFormSchema = buildSchema(User);

function users(req, res, next) {
    userStore.all()
        .then(function(result)  {
            res.render('users', {
                users: result
            });
        })
        .then(null,next);
}

function editUser(req, res, next) {
    userStore.get(req.params.id)
        .then(function(user) {
            res.render('edit-user', {
                user: user,
                userFormSchema: userFormSchema
            });

        })
        .then(null,next);

}

function saveUser(req, res, next) {
    userStore.save(req.body)
        .then(function() {
            res.redirect('/users/' + req.params.id);
        })
        .then(null,next);

}

function newUser(req, res) {

    res.render('edit-user', {
        user: new User({
            id: 'newUser',
            password: '',
            email: '',
        }),

        userFormSchema: userFormSchema
    });
}

router.get('/new', newUser);
router.get('/', users);
router.get('/:id', editUser);
router.post('/:id', saveUser);


module.exports = router;
