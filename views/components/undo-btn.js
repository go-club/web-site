'use strict';


var thunk = require('vdom-thunk');
var u = require('jubiq');
var redoObjects = require('./redo-objects');
var he = require('he');
/**
 *  export thunked version to avoid create a new
 *  click hook on every rendering
 */
module.exports = function undoBtnThunked(rootComponent, icon, text, className) {
    return thunk(undoBtn, rootComponent, icon, text, className);
};


/**
 *   render a form that, if js is enabled, will revert
 *   root model to previous state
 *
 *   if js is not enabled, the button appear as disabled
 *   and do nothing when clicked
 *
 *   rootComponent: Component - the component holding root model
 *   icon: String - optional class to add an icon to button
 *   text: String - optional caption of the button
 *   className: String - optional class to apply css style to the button
 */
function undoBtn(rootComponent, icon, text, className) {
    var props = [{
        handleClickHook: new HandleClickHook(rootComponent)
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

function HandleClickHook(rootComponent) {
    this.rootComponent = rootComponent;
}

HandleClickHook.prototype.hook = function(node, prop, prev) {
    if (this.node !== node) {
        //remove old listener
        if (this.listener) {
            this.node.removeEventListener('click', this.listener, false);
        }
        this.node = node;
        this.listener = this.buttonClicked.bind(this);
        node.onclick = this.listener;
    }



};

HandleClickHook.prototype.buttonClicked = function(e) {
    var component = this.rootComponent;
    var root = component.root;

    var maybeRoot = Object.getPrototypeOf(root);
    if (Object.getPrototypeOf(maybeRoot).constructor.typeName !== 'Root') {
        alert('no more changes to undo');
        return;
    }

    redoObjects.set(maybeRoot, component.root);
    component.root = maybeRoot;

    component.emit('changed');

    e.preventDefault();
    return false;
};
