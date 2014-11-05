'use strict';


function getDefault() {
	return {
		url: null,
		editUser: null,
		users: [],
		loggedUser: null,
		error: null
		
	};
}

function get (url,loggedUser,propName,propValue) {
	console.log('url is now:',url);
	//if (url.indexOf('undefined') != -1) throw new Error();

	var def = getDefault();
	def[propName] = propValue;
	def.url = url;
	return def;	
}

module.exports = get;