var u = require('jubiq');
var content = require('./body');

module.exports = function render(truth) {
    //console.log(truth, typeof truth);
    //throw new Error    
    var root = JSON.stringify(truth);
    truth.debug();
    console.log(root)
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

            u.script('var truth = ' + root + ';'),
            u.script({src:'/go-club.js'})
        )
    );

};
