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