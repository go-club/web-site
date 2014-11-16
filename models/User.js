'user strict';


var i = require('immutato');
var common = require('./common-types');

module.exports = i.struct({
    id: i.String.maxlength(20).minlength(5).label('Name'),
    password: common.password.info({hidden:true}),
    email: common.email,
    admin: i.Boolean.default(false),
    confirmed: i.Boolean.default(false),
    registered: i.Date.optional().info({readonly:true}),
    rank: i.Number.optional().min(0)
},'User');

