var u = require('jubiq');
var logoUrl = '/img/white.png';
var link = require('../components/link');
//rootComponent, href, route, icon, text, className

function userActions(rootComponent) {


    if (!rootComponent.root.loggedUser) {
        return u.li(
            link(rootComponent, '/auth/login', null, 'Login with your account', null, 'Login', '.sign-up')
        );
    } else {
        return u.li(
            u.a(rootComponent.root.loggedUser.id),
            u.ul(
                u.li(link(rootComponent, '/auth/logout', null, '', null, 'Logout')),
                u.li(u.a('Profile'))
            )
        );

    }
}

module.exports = function render(rootComponent) {

    return u.nav(
        u.a(/.logo/, {
                href: '/'
            },
            u.img({
                src: logoUrl,
                alt: 'go-club'
            })
        ),

        u.ul(/#navigation-menu/,
            u.li(link(rootComponent, '/users', null, 'Users list', null, 'Users')),
            u.li(u.a('More'),
                u.ul(/.submenu/,
                    u.li(u.a('Submenu Item 1')),
                    u.li(u.a('Submenu Item 2')),
                    u.li(u.a('Submenu Item 3')),
                    u.li(u.a('Submenu Item 4'))
                )
            )
        ),
        u.ul(/#navigation-tools/,
            u.li(
                u.input({
                    type: 'search',
                    placeholder: 'search'
                }),
                u.button(/.search/, {
                        type: 'button',
                        title: 'Search the site'
                    },
                    u.i(/.fa.fa-search/)
                )
            ),
            userActions(rootComponent)
        )
    );
};
