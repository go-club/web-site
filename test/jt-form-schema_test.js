
var chai = require ('chai');
var expect = chai.expect;
chai.should();

var buildSchema = require('../models/jt-form-schema.js');
var User = require('../models/User');

var results = {
    name: 'User',
    props: {
        name: 'User',
        label: 'User'
    },
    children: {
        name: {
            name: 'name',
            props: {
                name: 'name',
                type: 'text',
                label: 'Name'
            }
        },
        password: {
            name: 'password',
            props: {
                name: 'password',
                type: 'text',
                label: 'Password'
            }
        },
        email: {
            name: 'email',
            props: {
                name: 'email',
                type: 'text',
                label: 'Email'
            }
        },
        admin: {
            name: 'admin',
            props: {
                name: 'admin',
                type: 'checkbox',
                label: 'Admin'
            }
        },
        confirmed: {
            name: 'confirmed',
            props: {
                name: 'confirmed',
                type: 'checkbox',
                label: 'Confirmed'
            }
        }
    }
};

var someFieldsResults = {
    name: 'User',
    props: {
        name: 'User',
        label: 'User'
    },
    children: {
        name: {
            name: 'name',
            props: {
                name: 'name',
                type: 'text',
                label: 'Name'
            }
        },
        password: {
            name: 'password',
            props: {
                name: 'password',
                type: 'text',
                label: 'Password'
            }
        }
    }
};


describe('buildSchema', function()  {
    var schema;
    
    before(function()  {
        schema = buildSchema(User);
    });

    it('is defined', function()  {
        buildSchema.should.be.a('function');
    });

    it('return a form schema', function()  {
        schema.should.be.a('object');
    });

    it('return all fields by default', function()  {
        JSON.parse(JSON.stringify(schema)).should.be.deep.equal(results);
    });

    it('return requested fields', function()  {
        var someFieldsSchema = buildSchema(User,['name','password']);
        JSON.parse(JSON.stringify(someFieldsSchema)).should.be.deep.equal(someFieldsResults);
    });




});    