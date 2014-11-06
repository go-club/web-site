var u = require('jubiq');

module.exports = function render(error){
	console.log (error.err);
	return u.section(
		u.h1(error.status),
		u.p('Error:',error.err.message),
		u.pre(error.err.stack)
	);
};
  