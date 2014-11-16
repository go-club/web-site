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
                //console.dir(f);
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
                return !f.type.readonly &&  !f.type.hidden &&  ( (!fields) || fields.indexOf(f.name) !== -1 );
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
    
    //console.dir(field);

    if (field.type === 'date') {
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
        name: field.name
    };

    if (field.type === 'checkbox') {
        if (value) {
            attrs.checked = value;    
        }
        
    } else {
        attrs.value = value;
    }

    if (field.required) {
        attrs.required = 'required';
    }

    if (field.readonly) {
        attrs.disabled = 'disabled';
    }

    return u.label(field.label, u.input(attrs));
};