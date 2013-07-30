var Blog = Blog || {};

Blog.Models.Post = Backbone.Model.extend({
	defaults: {
		title: '',
		body: '',
		author: '',
		created: null,
		modified: null
	},

	idAttribute: '_id',
	
	urlRoot: '/blogposts',

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
	},

	parse: function( response ) {
		if ( response.created ) {
			response.created = new Date( response.created );
		}
		if ( response.modified ) {
			response.modified = new Date( response.modified );
		}

		return response;
	},

	validate: function( attr ) {
		var errors = [];

		if ( !attr.title.trim() )
			errors.push({attribute: 'title', error: 'is required attribute'});
		if ( !attr.body.trim() )
			errors.push({attribute: 'body', error: 'is required attribute'});

		if ( errors.length )
			return errors;
	}
});