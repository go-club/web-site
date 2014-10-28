
import chai from 'chai';
var expect = chai.expect;
chai.should();

import { buildModel } from '../models/jt-mongoose.js';
import User from '../models/User';
import initModel from '../models/init';

describe('buildModel', () => {
    var model;
    
    after(() => {
        initModel.db.close();
    });

    before((done) => {
        model = buildModel(User);
        initModel().then(done);
    });

    it('is defined', () => {
        buildModel.should.be.a('function');
    });

    it('return a mongoose model', () => {
        model.should.be.a('object');
    });


    it('has proper name', () => {
        model._model.modelName.should.be.equal('User');
    });

    it('return records', (done) => {
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