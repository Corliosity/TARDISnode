var express = require('express'),
	connect = require('connect'),
	jade	= require('jade');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname, '/_assets'));

app.get('/', function(req, res) {
	res.render('index.jade', pageTitle="Welcome Whovians");
});

var port = 3000;

app.listen(port, function() {
	console.log('Application is starting');
});