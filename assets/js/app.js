'use strict';

var u = require('jubiq');
var body = require('../../views/layouts/body');
var Root = require('../../models/Root');

u.mount(body, document.querySelector('section#content'), new Root(window.truth));




