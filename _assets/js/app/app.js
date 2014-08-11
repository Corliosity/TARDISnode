var meetupAPIKEY = 'c794164d5046a6b1550153b5f5c6';

var OAUTHKEY = 'bq7457keoj0d5gdm3c403hcc7f';
var OAUTHSECRET = '1075aqn4lhia9p5hsao0edhqrt';

var Meetup = Backbone.Model.extend({

	initialize: function() {
		console.log("Model has been initialized");
	}

});

var Group = Backbone.Collection.extend({
	model: Meetup
})


//Create an ajax function call to return meetup data
// Since the base URL is the same we will create
// a function where we can pass the parameter of 
// our need
function getMeetupData(purpose) {

	var baseURL = 'https://api.meetup.com/2/';
	var apiRequest = purpose
	var parameterBASE = '&sign=true&photo-host=public&group_urlname=Mile-High-Who';
	var KEY = 'key=' + meetupAPIKEY;

	var completeURL = baseURL + apiRequest + '?' + KEY + parameterBASE;


	console.log(completeURL);

}

getMeetupData('groups');


var meetupModel = new Meetup();