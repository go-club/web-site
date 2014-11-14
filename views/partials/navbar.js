var u = require('jubiq');
var logoUrl = '/img/white.png';
var link = require('../components/link');
//rootComponent, href, route, icon, text, className

module.exports = function render(rootComponent) {

    return u.nav(
        u.div(/.navigation-wrapper/,
            u.a(/.logo/,
                u.img({src: logoUrl,alt: 'go-club'})
            ),
            u.a(/#js-mobile-menu.navigation-menu-button/, {href: ''}, 'MENU'),
            u.div(/.nav/,
                u.ul(/#navigation-menu/,
                    u.li(/.nav-link/, link(rootComponent,'/users',null,'Users list',null,'Users')),
                    u.li(/.nav-link.more/, u.a('More'),
                        u.ul(/.submenu/,
                            u.li(u.a('Submenu Item'))
                        )
                    )
                )
            ),
            u.div(/.navigation-tools/,
                u.div(/.search-bar/,
                    u.div(/.search-and-submit/,
                        u.input({type: 'search',placeholder: 'Enter Search'}),
                        u.button(/.search/, {
                                type: 'button',
                                title: 'Search the site'
                            },
                            u.i(/.fa.fa-search/)
                        )
                    )
                ),
                u.a(/.sign-up/, 'Sign Up')
            )
        )
    );
};
