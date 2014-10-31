var jt = require('jt');


var ReactForms = require('react-forms');
var Schema = ReactForms.schema.Schema;
var Property = ReactForms.schema.Property;

function transpile(type) {
    //console.log(type)
    switch (type) {
        case 'Number':
            return {valueTranslate:'number',inputType:'number'};
        case 'String':
            return {valueTranslate:'string',inputType:'text'};
        case 'Boolean':
            return {valueTranslate:'bool',inputType:'checkbox'};
        case 'Date':
            return {valueTranslate:'date',inputType:'date'};
    }
    return {valueTranslate:'any',inputType:'text'};
}

module.exports = function buildSchema(Structure, fields) {

    var props = Structure.meta.fields
        .filter(function(f) {
            return (!fields) || fields.indexOf(f.name) !== -1;
        })
        .map(function(f) {
            var input = transpile(f.type);
            var propAttrs = {
                name: f.name,
                type: input.valueTranslate,
                inputType: input.inputType,
                label: f.label
            };

            return new Property(propAttrs);
        });

    var schemaAttrs = {
        //name: Structure.meta.type,
        label: Structure.meta.type
    };

    return new Schema(schemaAttrs, props);
};
