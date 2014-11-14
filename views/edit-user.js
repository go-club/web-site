var u = require('jubiq');
var schema = require('../models/jt-form-schema');
var form = require('./components/form');
var undoBtn = require('./components/undo-btn');

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
        undoBtn(rootComponent,'.fa.fa-undo','Undo','.undo'),
        u.a(/.redo/, u.i(/.fa.fa-repeat/))
    ];

    return u.section(/.users.edit.admin/,
        u.header(
            u.h1('Edit User')
        ),
        form({
                name: 'edit-user',
                action: '/users/' + user.id, 
                method: 'POST',
                rootComponent: rootComponent,
                payloadPath:'editUser.model'
            }, 
            actions.concat(htmlFields)
        )
        


    );

};
