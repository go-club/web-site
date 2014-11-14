'use strict';


var thunk = require('vdom-thunk');
var u = require('jubiq');
var redoObjects = require('./redo-objects');
var ent = require('ent');
var popstateHooked;
/**
 *  export thunked version to avoid create a new
 *  click hook on every rendering
 */
module.exports = function linkThunked(rootComponent, href, route, title, icon, text, className) {
    return thunk(link, rootComponent, href, route, title, icon, text, className);
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
        props.push(ent.decode('&nbsp;'));
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
        this.node.removeAttribute('href');
        
        this.listener = this.anchorClicked.bind(this);
        node.addEventListener('click', this.listener, false);
    }



};

HandleClickHook.prototype.anchorClicked = function(e) {
    var component = this.rootComponent;
    var root = component.root;

    var url = this.href;
    var route = this.route || url;

    var options = {
        url: url,
        headers: {
            'accept': 'application/json'
        }
    };
    
    var request = require('browser-request');

    request(options, function(er, response, body) {
        var res = JSON.parse(body);
        var operations = {
                url: route
        };
        operations[res.name] = res.data;
        component.root = root.set(operations);

        //jshint browser:true
        history.pushState(JSON.stringify(component.root), null, url);
        component.emit('changed');
    });



    e.preventDefault();
    return false;
};
