var u = require('jubiq');
var assign = require('object-assign');

function inputType(type) {
    //console.log(type)
    switch (type) {
        case 'Number':
            return 'number';
        case 'String':
            return 'text';
        case 'Boolean':
            return 'checkbox';
        case 'Date':
            return 'date';
        
    }
    return 'text';
}

exports.buildSchema = function buildSchema(Structure, fields) {
    var builder = function(model){
        var inputs = Structure.meta.fields
            .filter(function(f) {
                return !f.type.hidden &&  ( (!fields) || fields.indexOf(f.name) !== -1 );
            })
            .map(function(f) {
                console.dir(f);
                var attrs = {
                    name: f.name,
                    type: f.type.inputType || inputType(f.type.primitive.name),
                    readonly: !!f.type.readonly,
                    label: f.type.label,
                    required: f.type.primitive.name !== 'Boolean' && !f.type.optional
                };

                return attrs;
            });


        return inputs;    
    };

    builder.from = function(data){
        var inputs = Structure.meta.fields
            .filter(function(f) {
                return (!fields) || fields.indexOf(f.name) !== -1;
            })
            .map(function(f) {
                var fData =  {};
                var value = Structure.props[f.name].from(data[f.name]);
                if (value === undefined && f.type.primitive.name === 'Boolean') {
                    value = false;
                }
                fData[f.name] = value;
                return fData; 
            });


        return assign.apply(null,inputs);    
    };

    return builder;
    
};

exports.render = function render(field, value) {
    var val;
    
    console.dir(field);

    if (field.type === 'checkbox') {
        val = 'true';
    } else if (field.type === 'date') {
        if (value) {
            val = new Date(value).toISOString().slice(0,10);    
        } else {
            val = null;
        }
        
    } else {
        val = value;
    }

    var attrs = {
        type: field.type,
        
        required: field.required,
        disabled: !!field.readonly,
        value: val,
        checked: field.type === 'checkbox' ? value : undefined,
        name: field.name
    };

    

    return u.label(field.label, u.input(attrs));
};