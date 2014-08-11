module.exports = function(app) {
	
	app.get('/', function(req, res) {
		res.render('index.jade', pageTitle="Welcome Whovians");
	});

	app.get('/about', function(req, res){
		res.render('about.jade', pageTitle="About Mile Hi Who");
	});
}