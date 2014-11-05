'use strict';
var objectPath = require("object-path")
var u = require('jubiq');
var body = require('../../views/layouts/body');
var EventEmitter = require('node-event-emitter');
var assign = require('object-assign');
var request = require('browser-request');
var component = function() {
    return body(window.truth);
};

EventEmitter.init.call(component);

assign(component, EventEmitter.prototype);

u.mount(component, document.body, 'keepDOM', virtualify);

virtualify();

function virtualify() {
    var anchors = document.querySelectorAll('a[href]');
    [].slice.call(anchors).forEach(function(a) {
        var href = a.getAttribute('href');
        a.removeAttribute('href');
        a.setAttribute('data-href', href);
        a.addEventListener('click', raiseAction, false);

    });

    var forms = document.querySelectorAll('form[action]');
    [].slice.call(forms).forEach(function(f) {
        var action = f.getAttribute('action');
        f.removeAttribute('action');
        f.setAttribute('data-action', action);
        f.addEventListener('submit', raiseSubmit, false);
        f.addEventListener('change', raiseChange, false);
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

        window.truth.url = route;
        window.truth[res.name] = res.data;

        component.emit('changed');
    });
}

function raiseChange(e) {
    var input = e.target;
    var form = e.currentTarget;
    var property = input.getAttribute('name');
    var payloadName = form.getAttribute('data-payload') || null;
    var body = (payloadName && objectPath.get(window.truth, payloadName)) || null;
    body[property] = input.value;

    component.emit('changed');
    
    e.preventDefault();
    return false;
}


function raiseSubmit(e) {
    var url = e.currentTarget.getAttribute('data-action');
    var method = e.currentTarget.getAttribute('method') || 'get';
    var payloadName = e.currentTarget.getAttribute('data-payload') || null;
    var body = (payloadName && JSON.stringify(objectPath.get(window.truth, payloadName))) || null;

    var options = {
        body: body,
        method: method,
        url: url,
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        }
    };

    request(options, function(er, response, body) {
        var res = JSON.parse(body);

        window.truth[res.name] = res.data;

        component.emit('changed');
    });

    e.preventDefault();
    return false;
}
