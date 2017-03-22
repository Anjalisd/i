var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var appointmentsSchema = new Schema({
    patientName : {type: String},
    doctorName  : {type: String},
    city : {type: String},
    contact : {type : Number},
});
var appointments = mongoose.model('appoints', appointmentsSchema);
module.exports = appointments;