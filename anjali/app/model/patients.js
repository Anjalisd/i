var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var patientsSchema = new Schema({
    username : {type: String},
    password  : {type: String},
    confirmpassword  : {type: String},
    age : {type: Number},
    city : {type: String},
 	contact : {type : Number},
});
var patients = mongoose.model('patients', patientsSchema);
module.exports = patients;