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
		this.set( 'created', 'slime' );
		this.set( 'modified', 'slime' );
		this.set( 'author', 'slime' );

		return _.clone( this.attributes );
	}
});