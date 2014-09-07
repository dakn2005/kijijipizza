var mongoose = require('mongoose'),
    async = require('async'),
    _ = require('underscore'),
    Employee = mongoose.model('Employee');
User = mongoose.model('User');

exports.all = function (req, res) {
    Employee.find().exec(function (err, employees) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(employees);
        }
    });
    //res.jsonp(empdata);
};

exports.show = function (req, res, id) {
    res.json(req.empdatum);
};

exports.delete = function (req, res) {
    var emp = req.empdatum;

    emp.remove(function (err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(1);
        }
    });
};

exports.update = function (req, res) {
    var emp = req.empdatum;
    emp = _.extend(emp, req.body);

    emp.save(function (err) {
        res.jsonp(emp);
    });
};

exports.create = function (req, res) {
    var self = this;
    self.Emp = new Employee(req.body);
    self.user = User.findById(req.body.userid);

    self.Emp.EmployeeName = req.body.name;
    self.Emp.Email = req.body.email;
    self.Emp.IDNumber = req.body.idnumber;
    self.Emp.UserId = req.body.userid;
    //update user to reflect employee status


    self.Emp.save(function (err, data) {
        if (err) {
            res.jsonp({
                output: err
            });
        } else {
            res.jsonp({
                msg: 'save successful',
                output: self.Emp
            });
        }

        // this is hitting rock!!

        //        else {
        //            self.user.isEmployee = "true";
        //            self.user.save(function (err) {
        //                if (err) {
        //                    res.jsonp({
        //                        output: err
        //                    });
        //                } else {
        //                    res.jsonp({
        //                        msg: 'save successful',
        //                        output: self.Emp
        //                    });
        //                }
        //            });
        //        }
    });

};

exports.empdatum = function (req, res, next, id) {
    Employee = mongoose.model('Employee');

    Employee.findById(id, function (err, employee) {
        if (err)
            return next(err);
        if (!employee)
            return next(new Error('Cannot load employee data ' + id));

        req.empdatum = employee;
        next();
    });

    //http://stackoverflow.com/questions/19590063/get-specific-json-object-by-id-from-json-array-in-angularjs
    //    req.empdatum = _.find(Employee.find().exec(), function (s) {
    //        return s._id == id
    //    });
    //    next();
};