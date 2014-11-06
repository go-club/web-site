'user strict';


var i = require('immutato');

module.exports = i.struct({
    id: i.String.maxlength(20).label('Name'),
    password: i.String,
    email: i.String.maxlength(200),
    admin: i.Boolean.default(false),
    confirmed: i.Boolean.default(false)
},'User');

