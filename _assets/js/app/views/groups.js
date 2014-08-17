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
    	console.log(myGroup);
    	$(this.el).append(this.template({ group: this.collection.toJSON() }));
    	//$(this.el).html(this.template({ group: "My name is...." }));
    }
    

});
