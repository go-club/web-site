var u = require('jubiq');
var form = require('./components/form');
var schema = require('../models/jt-form-schema');

module.exports = function render(rootComponent) {
    var changePassword = rootComponent.root.changePassword;
    var htmlFields = changePassword.schema.map(function(f) {
        return schema.render(f, changePassword.model[f.name]);
    });
    
    return u.section(/.change-password/,

        u.header(
            u.h1('go-club'),


            u.p('Change password')
        ),

        form({
                name: 'change-password',
                action: '/auth/change-password', 
                method: 'POST',
                rootComponent: rootComponent,
                payloadPath:'changePassword.model'
            }, 
            htmlFields.concat([
                u.button(
                    /.change/, {
                        type: 'submit'
                    },
                    'Change'
                )
            ])
        )
    );
};
