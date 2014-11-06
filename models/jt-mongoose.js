var mongoose = require('mongoose');
var chilli = require('chilli');
var models = new Map();
var assign = require('object-assign');

function demongoosify(Structure) {
    return function(doc) {
        delete doc._doc._id;
        delete doc._doc.__v;

        return new Structure(doc._doc);
    };

}

module.exports = function buildModel(Structure) {

    if (models.has(Structure)) {
        return models.get(Structure);
    } else {



        var fields = Structure.meta.fields.map(function(f) {
            var prop = {};
            prop[f.name] = f.type.primitive;

            return prop;
        });

        var documentFields = assign.apply(null, fields);
        var Model = mongoose.model(Structure.meta.type, documentFields);

        var result = {
            _model: Model,

            all: function() {
                return Model.find().exec()
                    .then(function(results) {
                        return results.map(demongoosify(Structure));
                    });
            },

            save: function(doc) {
                var instance = new Structure(doc);

                return new Promise(function(resolve, reject) {
                    Model.findOne({
                            id: instance.id
                        }).exec()
                        .then(function(existingDoc) {
                            try {
                                if (!existingDoc) {
                                    existingDoc = new Model();
                                }
                                assign(existingDoc, instance);

                                existingDoc.save(function(err) {
                                    if (err) {
                                        
                                        return reject(err);
                                    }
                                    resolve();
                                });

                            } catch (err) {
                                
                                reject(err);
                            }

                        })
                        .then(null, function(err){
                            
                            reject(err);
                        });
                });


            },

            get: function(id) {
                return Model.findOne({
                        id: id
                    }).exec()
                    .then(demongoosify(Structure));
            },

            delete: function(id) {
                return new Promise(function(resolve, reject) {
                    Model.remove({
                        id: id
                    }, function(err) {
                        if (err) {
                            return reject(err);
                        }

                        resolve();
                    });
                });

            }
        };

        models.set(Structure, result);
        return result;
    }
};
