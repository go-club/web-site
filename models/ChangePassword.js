'user strict';


var i = require('immutato');
var common = require('./common-types');

module.exports = i.struct({
    password: common.password,
    confirmPassword: common.password,
},'ChangePassword');

