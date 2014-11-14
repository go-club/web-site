'use strict';

var u = require('jubiq');
var body = require('../../views/layouts/body');
var EventEmitter = require('node-event-emitter');
var assign = require('object-assign');
var request = require('browser-request');
var Root = require('../../models/Root');


var component = function() {
    return body(component.root, component);
};

component.root = new Root(window.truth);
EventEmitter.init.call(component);
assign(component, EventEmitter.prototype);

u.mount(component, document.body, 'keepDOM', virtualify);

function virtualify() {
   
}



