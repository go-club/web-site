var jt = require('jt');
import mongoose from 'mongoose';

export function buildModel(Structure) {
	var fields = Structure.meta.fields.map((f)=>{
		let prop = {};
		prop[f.name]=f.primitive;
		return prop; 
	});
	var documentFields = Object.assign.apply(null,fields);
	var model = mongoose.model(Structure.meta.type, documentFields);

	return {
		_model: model,
		
		all() {
			return model.find().exec().then((results) => results.map(Structure));
		}
	};
} 