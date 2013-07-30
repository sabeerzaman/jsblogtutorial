var Blog = Blog || {};

Blog.Router = Backbone.Router.extend({
	routes: {
		'(!)': 'index',
		'!post/:id': 'singlePost',
		'!post(/)': 'newPost'
	},

	initialize: function() {
		this.heading = $('header > h1');
	},

	updateHeading: function( title ) {
		this.heading.text( title );
	},

	index: function() {
		console.log( 'Not implemented yet' );
	},

	singlePost: function( id ) {
		console.log( 'singlePost route' );
		this.updateHeading( '' );
		var post = new Blog.Models.Post({ _id: id });
		post.fetch().done(function() {
			var newPostView = new Blog.Views.Post({ model: post });
			$('.main').html( newPostView.render().$el );
		});
	},

	newPost: function() {
		console.log( 'newPost route' );
		this.updateHeading( 'New Post' );
		var post = new Blog.Models.Post(),
			newPostView = new Blog.Views.Post({ model: post });

		$('.main').html( newPostView.render().$el );	
	},

	start: function() {
		Backbone.history.start({ pushState: false	});
	}
});