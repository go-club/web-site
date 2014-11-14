'use strict';

var objectPath = require('object-path');
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

virtualify();

window.onpopstate = function(event) {

    component.root = new Root(JSON.parse(event.state));
    component.emit('changed');
};


function virtualify() {
    var anchors = document.querySelectorAll('a[href]');
    [].slice.call(anchors).forEach(function(a) {
        var href = a.getAttribute('href');
        a.removeAttribute('href');
        a.setAttribute('data-href', href);
        a.addEventListener('click', raiseAction, false);

    });

}

function raiseAction(e) {
    var url = e.currentTarget.getAttribute('data-href');
    var route = e.currentTarget.getAttribute('data-route') || url;
    var options = {
        url: url,
        headers: {
            'accept': 'application/json'
        }
    };

    request(options, function(er, response, body) {
        var res = JSON.parse(body);
        var operations = {
                url: route
        };
        operations[res.name] = res.data;
        component.root = component.root.set(operations);

        history.pushState(JSON.stringify(component.root), null, url);
        component.emit('changed');
    });
}



