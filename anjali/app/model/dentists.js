var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var dentistsSchema = new Schema({
    doctorName : {type: String},
    time  : {type: String},
    day  : {type: String},
    contact : {type : Number},
});
var dentists = mongoose.model('dentists', dentistsSchema);
module.exports = dentists;