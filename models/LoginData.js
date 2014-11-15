'user strict';


var i = require('immutato');
var User = require('./User');
module.exports = i.struct({
    username: User.props.id,
    password: User.props.password,
    remember: i.Boolean.default(false)
},'LoginData');

