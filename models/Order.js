/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose');
Schema = mongoose.Schema;

var OrderSchema = new Schema({
    OrderBy: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    AssignedTo: {
        type: Schema.ObjectId,
        ref: 'Employee'
    },
    Location: String,
    DeliveryDate: String,
    OrderDescription: String,
    Items: [],
    OrderDate: String, //pre set this before validations
    Status: String
});

mongoose.model('Order', OrderSchema);