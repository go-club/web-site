var u = require('jubiq');
var schema = require('../models/jt-form-schema');
module.exports = function render(userSchema) {
    var user = userSchema.model;
    var fields = userSchema.schema;
    var htmlFields = fields.map(function(f) {
        console.dir(user);
        return schema.render(f, user[f.name]);
    });

    return u.section(/.users.edit.admin/,
        u.header(
            u.h1('Edit User')
        ),

        u.form.apply(null, htmlFields.concat(
                [{
                        action: '/users/' + user.id,
                        method: 'POST',
                        'data-payload': 'editUser.model'
                    },
                    u.button(/.save/, {
                            type: 'submit'
                        },
                        'Save changes'
                    )
                ])

        )

    );

};
