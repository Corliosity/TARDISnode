var express = require('express'),
	connect = require('connect'),
	jade	= require('jade'),
	routes	= require('./routes'),
	cors	= require('cors');
var app = express();
app.use(cors());

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname, '/_assets'));

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/meet', routes.meetup);

var port = 3000;

app.listen(port, function() {
	console.log('Application is starting');
});