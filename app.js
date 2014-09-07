/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    passport = require('passport'),
    flash = require('connect-flash'),
    async = require('async');

//configs
var auth = require('./config/middlewares/authorization');

var app = express();

//db conn
var db = require('mongoose');
var mongoose = db.connect('mongodb://localhost/pizzahut');
//mongoose.createConnection('localhost', 'pizzahut2'); //mongoose.connect('mongodb://localhost/pizzahut');
//autoIncrement.initialize(db);

// load models
var models_path = __dirname + '/models'
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path + '/' + file);
});

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.bodyParser());
// cookieParser should be above session
app.use(express.cookieParser());
app.use(express.session({
    secret: 'mysecretisout'
}));


//// use passport session
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); //flash soln: https://groups.google.com/forum/#!topic/passportjs/9DWc4XJSEPk
app.use(app.router);

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//config paths
require('./config/passport')(passport);


//routes
var routes = require('./routes');
app.get('/', routes.index);

var user = require('./routes/user');
//app.get('/users', user.list);
app.post('/users/create', user.create);
app.get('/signup', user.signup);
app.get('/signin', user.signin);
app.get('/signout', user.signout);
app.post('/users/session', passport.authenticate('local', {
    failureRedirect: '/signin',
    failureFlash: 'Invalid username or password.'
}), user.session);
app.get('/users/me', user.me);

app.get('/users', auth.requiresLogin, user.list);
app.get('/users/:userId', user.show);
app.del('/users/:userId', user.delete);
app.put('/users/:userId', user.update);
app.param('userId', user.user);


var emp = require('./routes/employee');
app.get('/employees', auth.requiresLogin, emp.all);
app.post('/employees', emp.create);
app.get('/employees/:empId', emp.show);
app.del('/employees/:empId', emp.delete);
app.put('/employees/:empId', emp.update);
app.param('empId', emp.empdatum);


var ord = require('./routes/order');
//app.get('/orders/admin', auth.requiresLogin, ord.all);
app.get('/orders',  auth.requiresLogin, ord.allPerUser);
app.post('/orders', ord.create);
app.get('/orders/:orderId', ord.show);
app.del('/orders/:orderId', ord.delete);
app.put('/orders/:orderId', ord.update);
app.param('orderId', ord.loadOrder);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});