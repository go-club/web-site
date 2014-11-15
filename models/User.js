'user strict';


var i = require('immutato');

module.exports = i.struct({
    id: i.String.maxlength(20).minlength(5).label('Name'),
    password: i.String.minlength(5).info({inputType:'password'}),
    email: i.String.maxlength(200).minlength(5),
    admin: i.Boolean.default(false),
    confirmed: i.Boolean.default(false)
},'User');

