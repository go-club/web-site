var jt = require('jt');
var mongoose = require('mongoose');
var models = new Map();

module.exports =function buildModel(Structure) {
    
    if (models.has(Structure)){
        return models.get(Structure);
    } else {

        

        var fields = Structure.meta.fields.map(function(f) {
            var prop = {};
            prop[f.name] = f.primitive;
            return prop;
        });
        var documentFields = Object.assign.apply(null, fields);
        var model = mongoose.model(Structure.meta.type, documentFields);

        var result = {
            _model: model,

            all: function() {
                return model.find().exec()
                    .then(function(results) {return results.map(Structure);});
            },

            save: function(doc) {

                return new Promise(function(resolve, reject) {
                    model.findOne({id: doc.id}).exec()
                        .then(function (existingDoc) {
                            try {
                                if (!existingDoc) {
                                  existingDoc = new model();
                                }
                                Object.assign(existingDoc,doc);

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
                        .then(null,reject);
                });


            },

            get: function(id) {
                return model.findOne({id:id}).exec()
                    .then(function(doc) { return new Structure(doc); });
            },
            
            delete: function(id) {
                return model.findOne({id:id}).exec()
                    .then(function(doc) { return new Structure(doc); });
            }
        };

        models.set(Structure,result);
        return result;
    }
};
