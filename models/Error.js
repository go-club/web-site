'user strict';


var i = require('immutato');

module.exports = i.struct({
    message: i.String,
    status: i.Number,
    stack: i.String
},'ErrorType');
