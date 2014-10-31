
var chai = require('chai');
var expect = chai.expect;
chai.should();

var buildModel = require ('../models/jt-mongoose.js');
var User = require('../models/User');
var initModel = require('../models/init');

describe('buildModel', function()  {
    var model;
    
    after(function()  {
        initModel.db.close();
    });

    before(function(done) {
        model = buildModel(User);
        initModel().then(done);
    });

    it('is defined', function()  {
        buildModel.should.be.a('function');
    });

    it('return a mongoose model', function()  {
        model.should.be.a('object');
    });


    it('has proper name', function()  {
        model._model.modelName.should.be.equal('User');
    });

    it('return records', function(done) {
        model.all()
          .then(function(results){
                results.should.be.deep.equal([
                    {
                      admin: true,
                      confirmed: true,
                      email: 'andrea.parodi@ebansoftware.net',
                      name: 'admin',
                      password: 'secret'
                    },
                    {
                      admin: true,
                      confirmed: true,
                      email: 'andrea.parodi@ebansoftware.net',
                      name: 'admin2',
                      password: 'secret'
                    }
                ]);
                done();
          })
          .then(null,done);
    });

});    