'user strict';


var i = require('immutato');
var User = require('./User');
var common = require('./common-types');

module.exports = i.struct({
    username: User.props.id,
    password: common.password,
    remember: i.Boolean.default(false)
},'LoginData');

