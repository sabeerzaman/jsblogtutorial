var Blog = Blog || {};

Blog.Models.Post = Backbone.Model.extend({
	defaults: {
		title: '',
		body: '',
		author: '',
		created: null,
		modified: null
	},
	
	url: '/slime',

	toJSON: function() {
		var now = new Date();
		this.set( 'created', now );
		this.set( 'modified', now );
		this.set( 'author', 'slime' );

		return _.clone( this.attributes );
	}
});