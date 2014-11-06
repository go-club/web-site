'user strict';


var i = require('immutato');
var User = require('./User');
var ErrorType = require('./Error');

var EditForm = i.struct({
	model: User,
	schema: i.Any
},'EditForm');

module.exports = i.struct({
    url: i.String,
    editUser: EditForm.optional(),
    loggedUser: User.optional(),
    error: ErrorType.optional(),
    users: i.Any//i.list(User).optional(),
},'Root');
