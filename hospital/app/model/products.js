var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var ProductSchema = new Schema({
    Name : {type: String},
    Details: {type: String},
    Price:{type: Number},
    status: {type: Boolean},
    created: Date,

   
});
var products = mongoose.model('products', ProductSchema);
module.exports = products;