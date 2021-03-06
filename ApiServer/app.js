/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var app = express();
var mongoUrl = 'mongodb://127.0.0.1/nodeJsPocApiServer';

app.configure(function() {
	// all environments
	app.set('port', process.env.PORT || 8000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.bodyParser());
	app.use(function(req, res,next){
		res.send(404, 'Page not found')
	})
	// development only
	if ('development' == app.get('env')) {
		app.use(express.errorHandler());
	}
});

//defining global varibles
global._MONGODB = mongoose.createConnection(mongoUrl);
global._SCHEMA = mongoose.Schema;

//require export routes
var routes = require('./routes/exports');

function errorMsg(){
	response.send("error");
}
//declaring route's for request
app.post('/users/create/:activate', routes.users.add);
app.get('/users/activate', routes.users.activateUser);
app.get('/users/show/:id', routes.users.show);
app.get('/users/query', routes.users.query);
app.put('/users/update/:id', routes.users.update);
app.delete('/users/delete/:id', routes.users.delete);

app.post('/projects/create/:id', routes.projects.add);
app.get('/projects/query', routes.projects.query);
app.put('/projects/update/:id', routes.projects.update);
app.delete('/projects/delete/:id', routes.projects.delete);
app.get('/projects/show/:projectName', routes.projects.show);

app.post('/socials/create', routes.socials.add);
app.get('/socials/show/:id', routes.socials.show);
app.get('/socials/query', routes.socials.query);
app.put('/socials/update/:id', routes.socials.update);
app.delete('/socials/delete/:id', routes.socials.delete);

//routes declared for image events
app.post('/upload/uploadPic', routes.usersPic.add);
app.get('/upload/show/:id', routes.usersPic.show);
/*app.get('/upload/query', routes.usersPic.query);
app.put('/upload/update/:id', routes.socials.update);*/
app.delete('/upload/delete/:id', routes.usersPic.delete);

// declaring routes for login
app.post('/login/:emailId/:password', routes.logins.authenticate); 
app.post('/changePassword/:id/:password', routes.logins.changePassword); 
app.post('logout', routes.logins.logout);

//declaring routes for address
app.post('/address/create', routes.address.add);
app.get('/address/show/:id', routes.address.show);
app.get('/address/query', routes.address.query);
app.put('/address/update/:id', routes.address.update);
app.delete('/address/delete/:id', routes.address.delete);


http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

