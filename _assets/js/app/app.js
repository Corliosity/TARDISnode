var meetupAPIKEY = 'c794164d5046a6b1550153b5f5c6';

var OAUTHKEY = 'bq7457keoj0d5gdm3c403hcc7f';
var OAUTHSECRET = '1075aqn4lhia9p5hsao0edhqrt';

var Meetup = Backbone.Model.extend();

var Groups = Backbone.Collection.extend({
	
	model: Meetup,

	url : getMeetupData('groups'),

	parse : function (resp) {
		return resp.results;
	},

	sync: function(method, model, options) {
            var that = this;
                var params = _.extend({
                    type: 'GET',
                    dataType: 'jsonp',
                    url: that.url,
                    processData: false
                }, options);

            return $.ajax(params);
        }

});

var Event = Backbone.Model.extend();

var Events = Backbone.Collection.extend({

	Model : Event,

	url : getMeetupData('events'),

	parse : function (resp, xhr) {
		return resp.results;
	},

	sync: function(method, model, options) {
        var that = this;
            var params = _.extend({
                type: 'GET',
                dataType: 'jsonp',
                url: that.url,
                processData: false
            }, options);

        return $.ajax(params);
    }

});

var EventsView = Backbone.View.extend({

	initialize: function() {
		_.bindAll(this, 'render');

		this.collection = new Events();
		var that = this;

		this.collection.fetch({
			success: function() {
				return that.render();
			}
		});
	},

	template: _.template($('#eventsTemplate').html()),

	render: function() {
		var myEvent = this.collection.toJSON();
		console.log(myEvent);
		$(this.el).append(this.template({ events: this.collection.toJSON() }));
	}

});

var GroupsView = Backbone.View.extend({
	
	initialize: function() {
      _.bindAll(this, 'render');
      // create a collection
      this.collection = new Groups();
      // Fetch the collection and call render() method
      var that = this;
      this.collection.fetch({
        success: function () {
        	return that.render();
        }
      });
    },
    // Use an external template
    template: _.template($('#groupsTemplate').html()),
    
    render: function() {
        // Fill the html with the template and the collection
        //$(this.el).html(this.template({ tweets: this.collection.toJSON() }));
    	var myGroup = this.collection.toJSON();
    	$(this.el).append(this.template({ group: this.collection.toJSON() }));
    	//$(this.el).html(this.template({ group: "My name is...." }));
    }
    

});

//Create an ajax function call to return meetup data
// Since the base URL is the same we will create
// a function where we can pass the parameter of 
// our need
function getMeetupData(purpose) {

	var baseURL = 'https://api.meetup.com/2/';
	var apiRequest = purpose;
	var parameterBASE = '&sign=true&photo-host=public&group_urlname=Mile-High-Who&callback=?';
	var KEY = 'key=' + meetupAPIKEY;

	var completeURL = baseURL + apiRequest + '?' + KEY + parameterBASE;


	return completeURL;
}

var appEvents = new EventsView({
	el: $('#templateEvent')
});

var app = new GroupsView({
	el: $('#template')
});
