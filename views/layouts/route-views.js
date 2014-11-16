'use strict';

var pathtoRegexp = require('path-to-regexp');
var pages = [];

function registerView(path, view) {
  pages.push({
    re: pathtoRegexp(path),
    view: view
  });
}

function matchView(path) {
  var i = 0;
  var l = pages.length;

  for (; i<l; i++) {
    var page = pages[i];
    console.log(path,page.re)
    if (path.match(page.re)) {
      return page.view;
    }
  }

  return null;
}

module.exports = function routeViews(path, view) {
    if (view) {
        registerView(path, view);
    } else {
        return matchView(path);
    }
};
