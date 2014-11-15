var u = require('jubiq');
var undoBtn = require('./components/undo-btn');
var redoBtn = require('./components/redo-btn');
var link = require('./components/link');
var form = require('./components/form');

module.exports = function render(rootComponent) {
    var users = rootComponent.root.users;

    return u.section(/.users.list.admin/,

        u.header(
            u.h1('Users'),


            u.nav(
                link(rootComponent,'/users/new',null,'Create new user','.fa.fa-plus-circle','New','.add'),
                undoBtn(rootComponent, '.fa.fa-undo', 'Undo', '.undo'),
                redoBtn(rootComponent, '.fa.fa-repeat', 'Redo', '.redo')

            )
        ),



        u.table(
            u.thead(
                u.th('Name'),
                u.th('Password'),
                u.th('Email'),
                u.th('Admin'),
                u.th('Confirmed'),
                u.th(' ')
            ),
            u.tbody.apply(null,
                users.map(function(user) {
                    return u.tr(
                        u.td(user.id),
                        u.td(user.password),
                        u.td(user.email),
                        u.td(user.admin),
                        u.td(user.confirmed),
                        u.td(
                            form({
                                    name: 'delete-user-' + user.id,
                                    action: '/users/delete/' + user.id,
                                    method: 'POST',
                                    rootComponent: rootComponent
                                }, 
                                [u.button(/.delete/, {
                                        type: 'submit',
                                        title: 'Delete user ' + user.id
                                    },

                                    u.i(/.fa.fa-remove/)
                                )]
                            ),
                            link(
                                rootComponent,
                                '/users/' + user.id,
                                '/users/:id',
                                'Edit user ' + user.id,
                                '.fa.fa-edit',
                                '',
                                '.edit'
                            )

                           
                        )
                    );
                })
            )
        )
    );
};
