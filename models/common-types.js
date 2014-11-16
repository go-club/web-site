'user strict';


var i = require('immutato');
var email = require('valid-email');

module.exports = {
	email: i.String
		.maxlength(200)
		.minlength(5)
		.info({inputType:'email'})
		.validate(function(value){
			if (!email(value)) {
				return '`' + value + '` is not a valid e-mail address.';
			}

			return null;
		}),

	password: i.String.minlength(5).info({inputType:'password'})

};