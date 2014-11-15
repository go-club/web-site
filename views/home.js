var u = require('jubiq');

module.exports = function render(rootComponent) {

    return u.section(/.home/,

        u.header(
            u.h1('go-club'),


            u.p('Welcome')
        )
    );
};