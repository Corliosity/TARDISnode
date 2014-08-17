var Groups = Backbone.Collection.extend({
	
	model: Group,

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