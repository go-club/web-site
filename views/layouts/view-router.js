'use strict';

module.exports = function(rootComponent) {
    var truth = rootComponent.root;
    var url = truth.url;

    if (url[url.length - 1] == '/') {
        url = url.slice(0,-1);
    }
    switch (url) {
        case '':
            return require('../home')(rootComponent);
        case '/auth/login':
            return require('../login')(rootComponent);
        case '/auth/logout':
            return require('../home')(rootComponent);
        case '/users':
            return require('../users')(rootComponent);
        case '/error':
            
            return require('../error')(rootComponent);
        case '/users/new':
            return require('../edit-user')(rootComponent);
        case '/users/:id':
            return require('../edit-user')(rootComponent);

    }

    throw new Error('unknown url:'+url);
};
