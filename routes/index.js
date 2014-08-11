exports.index = function(req, res) {
		res.render('index.jade', pageTitle="Welcome Whovians");
}

exports.about = function(req, res) {
	res.render('about.jade', pageTitle="About Mile Hi Who");
}

exports.meetup = function(req, res) {
	var meetupAPIKEY = 'c794164d5046a6b1550153b5f5c6';

	res.render('meetup.jade', { pageTitle: "Whovian Meetups" });
}