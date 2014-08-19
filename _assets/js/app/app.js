$(document).ready(function(){

	// App JS for now will just load the initial view on page
	// Eventually more logic will help dictate what view should
	// be loaded

	var viewGroup = new GroupsView();

	var router = new Workspace();

	Backbone.history.start();

});
