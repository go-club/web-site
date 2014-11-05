var User = require('../models/User');
var buildSchema = require('../models/jt-form-schema.js').buildSchema;
var userFormSchema = buildSchema(User);
var userStore;

//var u = require('jubiq');

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

function saveUser(req, res, next) {

    userStore.save(req.body)
        .then(function() {
            res.redirect('/users/' + req.body.id);
        })
        .then(null, next);

}

function newUser(req, res) {
    var user = new User({
        id: 'newUser',
        password: '',
        email: ''
    });

    res.renderTruth('editUser', {
        model: user,
        schema: userFormSchema(user)
    });

}



module.exports = function(router, buildModel){
    userStore = buildModel(User);

    router.get('/new', newUser);
    router.get('/', users);
    router.get('/:id', editUser);
    router.post('/:id', saveUser);
    router.post('/delete/:id', deleteUser);
    return router;
};
