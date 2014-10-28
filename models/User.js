'user strict';


var jt = require('jt');

module.exports = jt.Structure('User',{
    name: jt.string.maxlength(20),
    password: jt.string,
    email: jt.string.maxlength(200),
    admin: jt.boolean.default(false),
    confirmed: jt.boolean.default(false)
});

