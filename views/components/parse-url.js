'use strict';

module.exports = function parseUrl(href) {
    //jshint browser: true
    var l = document.createElement('a');
    l.href = href;
    return l;
};
