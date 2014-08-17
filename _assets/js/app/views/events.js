var EventsView = Backbone.View.extend({

	el: $('#template'),

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
		//console.log(myEvent);
		$(this.el).append(this.template({ events: myEvent }));
	}

});
