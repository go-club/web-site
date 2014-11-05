var u = require('jubiq');
var content = require('./body');

module.exports = function render(truth) {
    
    
    return u.html({
            lang: 'en'
        },

        u.head(
            u.meta({
                charset: 'utf-8'
            }),
            u.title('go-club'),
            u.meta({
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            }),
            u.link({
                rel: 'stylesheet',
                href: '/style.css',
                media: 'screen'
            })
        ),

        u.body(
            content(truth),

            u.script('var truth = ' + JSON.stringify(truth) + ';'),
            u.script({src:'/go-club.js'})
        )
    );

};
