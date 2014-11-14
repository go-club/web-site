var u = require('jubiq');
var undoBtn = require('./components/undo-btn');
var redoBtn = require('./components/redo-btn');

module.exports = function render(users, rootComponent) {

    return u.section(/.users.list.admin/,

        u.header(
            u.h1('Users'),


            u.nav(
                u.a(/.add/, {
                        href: '/users/new',
                        title: 'Create new user'
                    },
                    u.i(/.fa.fa-plus-circle/)
                ),
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
                            u.form({
                                    action: '/users/delete/' + user.id,
                                    method: 'post'

                                },
                                u.button(/.delete/, {
                                        type: 'submit',
                                        title: 'Delete user ' + user.id
                                    },

                                    u.i(/.fa.fa-remove/)
                                )
                            ),

                            u.a(/.edit/, {
                                    'data-route': '/users/:id',
                                    href: '/users/' + user.id,
                                    title: 'Edit user ' + user.id
                                },

                                u.i(/.fa.fa-edit/)
                            )
                        )
                    );
                })
            )
        )
    );
};
