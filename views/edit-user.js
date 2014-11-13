var u = require('jubiq');
var schema = require('../models/jt-form-schema');
var form = require('./components/form');

module.exports = function render(userSchema, rootComponent) {
    var user = userSchema.model;
    var fields = userSchema.schema;
    var htmlFields = fields.map(function(f) {
        return schema.render(f, user[f.name]);
    });
    
    var actions = [
        u.button(/.save/, {
                type: 'submit'
            },
            'Save changes'
        ),
        u.a(/.undo/, u.i(/.fa.fa-undo/)),
        u.a(/.redo/, u.i(/.fa.fa-repeat/))
    ];

    return u.section(/.users.edit.admin/,
        u.header(
            u.h1('Edit User')
        ),
        form({
                action: '/users/' + user.id, 
                method: 'POST',
                rootComponent: rootComponent,
                payloadPath:'editUser.model'
            }, 
            actions.concat(htmlFields)
        )
        


    );

};
