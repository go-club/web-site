'user strict';


var jt = require('jt');

module.exports = jt.Structure('User',{
    id: jt.string.maxlength(20).label('Name'),
    password: jt.string,
    email: jt.string.maxlength(200),
    admin: jt.boolean.default(false),
    confirmed: jt.boolean.default(false)
});

