var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var adminUsersSchema = new Schema({
    username : {type: String},
    password  : {type: String},
    confirmpassword  : {type: String},
    Address : {type: String},
 	contact : {type : Number}
});
var adminUsers = mongoose.model('adminUsers', adminUsersSchema);
module.exports = adminUsers;