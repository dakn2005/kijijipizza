/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DeliveryScheduleSchema= new Schema({
    ID:{
        type: String
    },
    OrderNumber: {
        type: Schema.ObjectId,
        ref: 'Order'
    },
    EmployeeNumber: {
        type: Schema.ObjectId,
        ref: 'Employee'
    },
    DeliveryDate: {
        type: String
    },
    DeliveryStatus: {
        type: String
    }
});

mongoose.model('DeliverySchedule', DeliveryScheduleSchema);


