var mongoose = require('mongoose'),
    async = require('async'),
    _ = require('underscore'),
    Order = mongoose.model('Order');


exports.all = function (req, res) { //show all orders for admin
    Order.find().exec(function (err, orders) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(orders);
        }
    });
    //res.jsonp(empdata);
};

exports.allPerUser = function (req, res) { //show all orders for specific users
    if (req.user.isAdmin == "true") { // || !! req.user.isEmployee
        Order.find().exec(function (err, orders) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(orders);
            }
        });
    } else {
        Order.find({
            'OrderBy': req.user._id
        }).exec(function (err, orders) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(orders);
            }
        });
    }
};

exports.show = function (req, res, id) {
    res.jsonp(req.loadorder);
};

exports.delete = function (req, res) {
    var ord = req.loadorder;

    ord.remove(function (err) {
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
    var ord = req.loadorder;
    ord = _.extend(ord, req.body);

    ord.save(function (err) {
        res.jsonp(ord);
    });
//    res.jsonp(req.body);
};

exports.create = function (req, res) {
    //var self = this;
    var Ord = new Order(req.body);

    Ord.OrderBy = req.user;

    Ord.save(function (err, data) {
        if (err) {
            res.jsonp({
                output: err
            });
        } else {
            res.jsonp({
                msg: 'save successful',
                output: Ord
            });
        }
    });

};

exports.loadOrder = function (req, res, next, id) {
    Order = mongoose.model('Order');

    Order.findById(id, function (err, order) {
        if (err)
            return next('[error loading order] '+err);
        if (!order)
            return next(new Error('Cannot load order data ' + id));

        req.loadorder = order;
        next();
    });
};