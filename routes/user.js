/*
 * GET users listing.
 */

var mongoose = require('mongoose'),
    async = require('async'),
    _ = require('underscore'),
    User = mongoose.model('User');

exports.list = function (req, res) {
    User.find().exec(function (err, users) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(users);
        }
    });
};

exports.delete = function (req, res) {
    var usr = req.profile;

    usr.remove(function (err) {
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
    var usr = req.profile;
    usr = _.extend(usr, req.body);

    usr.save(function (err) {
        res.jsonp(usr);
    });
};

exports.create = function (req, res) {
    var usr = new User(req.body);
    usr.save(function (err, data) {
        if (err) {} else {
            res.redirect('/signin');
        }
    });
};

exports.signup = function (req, res) {
    res.render('users/signup', {
        user: new User()
    });
};

exports.signin = function (req, res) {
    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

exports.session = function (req, res) {
    res.redirect('/');
};

exports.signout = function (req, res) {
    req.logout();
    res.redirect('/signin');
};

exports.show = function (req, res) {
     res.json(req.profile);
//    var user = req.profile;
//    res.render('users/show', {
//        title: user.name,
//        user: user
//    });
};

exports.me = function (req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */

exports.user = function (req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function (err, user) {
            if (err)
                return next(err);
            if (!user)
                return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};