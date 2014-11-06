var u = require('jubiq');

module.exports = function render(error){
	console.log (error);
	return u.section(
		u.h1(error.status),
		u.p('Error:',error.message),
		u.pre(error.stack)
	);
};
  