'use strict';

var Root = require('./Root');

function get (url,loggedUser,propName,propValue) {
	var root = new Root({
		url:url,
		loggedUser: loggedUser
	})
		.set(propName, propValue);

	
	return root;		

}

module.exports = get;