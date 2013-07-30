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

		if ( !this.get( 'author' ) )
			this.set( 'author', 'Anonymous' );

		var attr = _.clone( this.attributes );
		attr.text = attr.body;
		delete attr.body;

		return attr;
	}
});