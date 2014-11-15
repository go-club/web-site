'use strict';


var thunk = require('vdom-thunk');
var u = require('jubiq');
var redoObjects = require('./redo-objects');
var he = require('he');
var popstateHooked;
/**
 *  export thunked version to avoid create a new
 *  click hook on every rendering
 */
module.exports = function linkThunked(rootComponent, href, route, title, icon, text, className) {
    var result =  thunk(link, rootComponent, href, route, title, icon, text, className);
    return result;
};


/**
 *   render an anchor that, if js is enabled, will 
 *   call the link via ajax GET, and then render results
 *   with virtual dom
 *
 *   if js is not enabled, the link act as a normal HTML link,
 *   switching the entre page
 *
 *   rootComponent: Component - the component holding root model
 *   icon: String - optional class to add an icon to button
 *   text: String - optional caption of the button
 *   className: String - optional class to apply css style to the button
 */
function link(rootComponent,  href, route, title, icon, text, className) {


    //handles back buttons
    //only on first call
    //rootComponent is supposed 
    //to remain constant between calls
    
    //jshint browser:true
    if (!popstateHooked && typeof window !== 'undefined') {
        popstateHooked = true;
        window.onpopstate = function(event) {

            rootComponent.root = new rootComponent.root.constructor(JSON.parse(event.state));
            rootComponent.emit('changed');
        };
    
    }
    
    var props = [{
        handleClickHook: new HandleClickHook(rootComponent, route, href),
        href: href,
        title: title
    }];

    if (className) {

        props.push(new RegExp(className));
    }

    if (icon) {

        props.push(u.i(new RegExp(icon)));
    }

    if (icon && text) {
        props.push(he.decode('&nbsp;'));
    }

    if (text) {

        props.push(text);
    }

    return u.a.apply(u, props);

}

function HandleClickHook(rootComponent, route, href) {
    this.rootComponent = rootComponent;
    this.route = route;
    this.href = href;
}

HandleClickHook.prototype.hook = function(node, prop, prev) {
    if (this.node !== node) {
        //remove old listener
        if (this.listener) {
            this.node.removeEventListener('click', this.listener, false);
        }

        this.node = node;

        //remove href attr to prevent
        //html handling
        setTimeout(function(){
            node.removeAttribute('href');    
        });
        
        
        this.listener = this.anchorClicked.bind(this);
        node.onclick = this.listener;
    }



};

HandleClickHook.prototype.anchorClicked = function(e) {
    var request = require('browser-request');
    var parseUrl = require('./parse-url');


    var component = this.rootComponent;
    var root = component.root;

    var uri = this.href;
    var route = this.route || uri;

    var options = {
        url: uri,
        headers: {
            'accept': 'application/json'
        }
    };
    


    request(options, function(er, response, body) {
        var res = JSON.parse(body);
        var responseUri = parseUrl(response.responseURL).pathname;
        var operations = {
                url: responseUri === uri ? route : responseUri,
                flash: res.flash,
                loggedUser: res.loggedUser
        };
        
        if (res.name) {
            operations[res.name] = res.data;    
        }
        
        component.root = root.set(operations);

        //jshint browser:true
        history.pushState(JSON.stringify(component.root), null, uri);
        component.emit('changed');
    });



    e.preventDefault();
    return false;
};
