var u = require('jubiq');


function inputType(type) {
    //console.log(type)
    switch (type) {
        case 'Number':
            return 'number';
        case 'String':
            return 'text';
        case 'Boolean':
            return 'checkbox';
        
    }
    return 'text';
}

exports.buildSchema = function buildSchema(Structure, fields) {
    return function(model){
        var inputs = Structure.meta.fields
            .filter(function(f) {
                return (!fields) || fields.indexOf(f.name) !== -1;
            })
            .map(function(f) {
                var attrs = {
                    name: f.name,
                    type: inputType(f.type.primitive.name),
                    label: f.type.label
                };

                return attrs;
            });


        return inputs;    
    };
    
};

exports.render = function render(field, value) {
    return u.label(field.label, u.input({
        type: field.type,
        value: value,
        name: field.name
    }));
};