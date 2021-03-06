'user strict';


var i = require('immutato');
var User = require('./User');
var LoginData = require('./LoginData');
var ErrorType = require('./Error');
var ChangePassword = require('../models/ChangePassword');


var EditForm = i.struct({
	model: User,
	schema: i.Any
},'EditForm');

var LoginForm = i.struct({
	model: LoginData,
	schema: i.Any
},'LoginForm');

var ChangePasswordForm = i.struct({
    model: ChangePassword,
    schema: i.Any
},'LoginForm');

module.exports = i.struct({
    url: i.String,
    login: LoginForm.optional(),
    editUser: EditForm.optional(),
    loggedUser: User.optional(),
    error: ErrorType.optional(),
    changePassword: ChangePasswordForm.optional(),
    users: i.Any,                       //i.list(User).optional(),
    flash: i.String.optional()
},'Root');
