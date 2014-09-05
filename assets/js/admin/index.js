var $ = window.$;
var path = window.location.pathname;

var vex = require('vex/js/vex.js');

vex.defaultOptions.className = 'vex-theme-os';

switch (path) {
    case '/users':
        require('./users');
        break;

    default:
        throw new Error('Unknown pathname:' + path);
}
