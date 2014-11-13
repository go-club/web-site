'use strict';

module.exports = form;

var u = require('jubiq');
var objectPath = require('object-path');



/**
 *   render a form that, if js is enabled, will submit
 *   specified part of root model via ajax.
 *
 *   if js is not enabled, the form is submittable
 *   using standard html method
 *
 *   action: String - the url to which submit form data
 *   method: String - the method to use to submit the form (POST or GET)
 *   payloadPath: String - the path from the root model to the object which is
 *                      to be submitted via ajax
 *   children: Array<vdom> - children vdom elements
 */
function form(opts, children) {
    var action = opts.action;
    var method = opts.method;
    var payloadPath = opts.payloadPath;
    var rootComponent = opts.rootComponent;

    return u.form.apply(null, [{
            handleChange: new HandleChangeHook(rootComponent, payloadPath),
            handleSubmit: new HandleSubmitHook(rootComponent, payloadPath, action),

            action: action,
            method: method
        }]
        .concat(children)
    );
}




//this hook handle changes on this form 
//input children element, updating the corresponding
//root field of the object payload we found via payloadPath
function HandleChangeHook(rootComponent, payloadPath) {
    this.rootComponent = rootComponent;
    this.payloadPath = payloadPath;
}

HandleChangeHook.prototype.hook = function(node, prop, prev) {
    node.addEventListener('change', this.formInputChanged.bind(this), false);
};

HandleChangeHook.prototype.formInputChanged = function(e) {
    var input = e.target;
    var form = e.currentTarget;
    var property = input.getAttribute('name');
    var component = this.rootComponent;
    var root = component.root;
    var body = objectPath.get(root, this.payloadPath);
    
    component.root = root.set(this.payloadPath + '.' + property, input.value);

    component.emit('changed');

    e.preventDefault();
    return false;
};

//this hook handle submission of this form 
//sending to the server then content of the object payload
//we found via payloadPath
function HandleSubmitHook(rootComponent, payloadPath, action) {
    this.rootComponent = rootComponent;
    this.payloadPath = payloadPath;
    this.action = action;

}

HandleSubmitHook.prototype.hook = function(node, prop, prev) {
    node.addEventListener('submit', this.formSubmitted.bind(this), false);

    //remove action attribute to prevent html submission
    node.removeAttribute('action');
};

HandleSubmitHook.prototype.formSubmitted = function(e) {
    var request = require('browser-request');
    var method = e.currentTarget.getAttribute('method') || 'get';
    var component = this.rootComponent;
    var root = component.root;
    var payload = objectPath.get(root, this.payloadPath);
    
    var options = {
        body: JSON.stringify(payload),
        method: method,
        url: this.action,
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        }
    };

    request(options, function(er, response, body) {
        var res = JSON.parse(body);

        component.root = root.set(res.name, res.data);

        component.emit('changed');
    });

    e.preventDefault();
    return false;
};