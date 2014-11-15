var u = require('jubiq');
var form = require('./components/form');
var schema = require('../models/jt-form-schema');

module.exports = function render(rootComponent) {
    var login = rootComponent.root.login;
    var htmlFields = login.schema.map(function(f) {
        return schema.render(f, login.model[f.name]);
    });
    
    return u.section(/.login/,

        u.header(
            u.h1('go-club'),


            u.p('Login')
        ),

        form({
                name: 'login',
                action: '/auth/login', 
                method: 'POST',
                rootComponent: rootComponent,
                payloadPath:'login.model'
            }, 
            htmlFields.concat([
                u.button(
                    /.login/, {
                        type: 'submit'
                    },
                    'Login'
                )
            ])
        )
    );
};
