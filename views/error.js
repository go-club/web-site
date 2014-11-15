var u = require('jubiq');

module.exports = function render(rootComponent){
	var error = rootComponent.root.error;
	console.log (error);
	return u.section(
		u.h1(error.status),
		u.p('Error:',error.message),
		u.pre(error.stack)
	);
};
  