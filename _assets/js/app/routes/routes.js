var Workspace = Backbone.Router.extend({
	
	routes: {
		"about": "aboutgroup",
		"events": "showEvent",
		"click .members": "showMembers"
	},

	aboutgroup: function() {
		var viewGroup = new GroupsView();
	},

	showEvent: function() {
		var allEvents = new EventsView();
	}
});