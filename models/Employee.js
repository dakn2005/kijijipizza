/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
    //EmployeeID: String,
    UserId: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    EmployeeName: String,
    Email: String,
    IDNumber: String
});

//EmployeeSchema.plugin(autoIncrement.plugin, 'Employee');
mongoose.model('Employee', EmployeeSchema);