'use strict';


var u = require('jubiq');
var objectPath = require('object-path');
var thunk = require('vdom-thunk');

/**
 *  keep track of hooks by form name to avoid create a new
 *  chnage and submit hooks on every rendering
 */
var hooksByName = {};


module.exports = form;


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
    var name = opts.name;
    var method = opts.method;
    var payloadPath = opts.payloadPath;
    var rootComponent = opts.rootComponent;

    /**
     *  keep track of hooks by form name to avoid create a new
     *  change and submit hooks on every rendering
     */
    var hooks;

    if (name in hooksByName) {
        hooks = hooksByName[name];
    } else {
        hooks = hooksByName[name] = {
            handleChange: new HandleChangeHook(rootComponent, payloadPath),
            handleSubmit: new HandleSubmitHook(rootComponent, payloadPath, action),
        };
    }

    return u.form.apply(null, [{
            handleChange: hooks.handleChange,
            handleSubmit: hooks.handleSubmit,

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
    if (this.node !== node) {
        if (this.listener) {
            this.node.removeEventListener('change', this.listener, false);
        }
        this.listener = this.formInputChanged.bind(this);
        this.node = node;
        node.addEventListener('change', this.listener, false);
    }

};

HandleChangeHook.prototype.formInputChanged = function(e) {
    var input = e.target;
    var form = e.currentTarget;
    var property = input.getAttribute('name');
    var component = this.rootComponent;
    var root = component.root;
    var body = objectPath.get(root, this.payloadPath);

    var prop = body.constructor.props[property];
    var value = input.type === 'checkbox' ? input.checked : input.value;

    

    component.root = root.set(this.payloadPath + '.' + property, prop.from(value));

    //console.dir(JSON.stringify(objectPath.get(root, this.payloadPath), null, 4));

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
    if (this.node !== node) {
        if (this.listener) {
            this.node.removeEventListener('submit', this.listener, false);    
        }
        
        this.listener = this.formSubmitted.bind(this);
        this.node = node;
        node.addEventListener('submit', this.listener, false);


        //remove action attribute to prevent html submission
        setTimeout(function(){
            node.removeAttribute('action');    
        });
        
    }

};

HandleSubmitHook.prototype.formSubmitted = function(e) {
    var request = require('browser-request');
    var parseUrl = require('./parse-url');

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
        var responseUri = parseUrl(response.responseURL).pathname;
        //jshint browser:true
        var operations = {
                flash: res.flash,
                loggedUser: res.loggedUser
        };

        //don't work in case such as users/new that redirect to users/id
        if (responseUri !== location.pathname){
            operations.url = responseUri;
        }
        
        if (res.name) {
            operations[res.name] = res.data;    
        }
        
        component.root = root.set(operations);

        component.emit('changed');
    });

    e.preventDefault();
    return false;
};
