var express = require('express'),
	routes	= require('./routes');

var app = express();

app.set('views', __dirname + '/views');
app.use(app.router);
app.use(express.static(__dirname, '/_assets'));
app.use(express.errorHandler({dumpExceptions: true, showStack: true})); 


app.get('/', function(req, res) {
	res.render('index.jade');
});

var port = 3000;

app.listen(port, function() {
	console.log('Application is starting');
});