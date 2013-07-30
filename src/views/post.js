var Blog = Blog || {};

Blog.Views.Post = Backbone.View.extend({
	className: 'post',
	
	tagName: function() {
		if ( this.model )
			return this.model.isNew() ? 'form' : 'article';
	},

	template: function() {
		if ( this.model )
			return this.model.isNew() ? this.editTemplate : this.readTemplate;
	},

	editTemplate: 
		'<input type="text" class="title">' +
		'<input type="text" class="author">' +
		'<textarea class="body"></textarea>' +
		'<button type="submit" value="submit">Submit Post</button>',

	readTemplate:
		'<header>' +
			'<h1 class="title"><%= title %></h1>' +
			'<strong class="author">by <%= author %></strong>' +
			'<em class="modified">Updated: <%= modified.toLocaleString() %></em>' +
			'<em class="created">Posted: <%= created.toLocaleString() %></em>' +
		'</header>' +
		'<p class="body"><%= body %></p>',	

	initialize: function() {
		if ( !this.model )
			throw 'No model defined';
	},

	render: function() {
		this.$el.html( _.template( _.result( this, 'template' ), this.model.attributes ) );
		return this;
	},

	events: {
		'click button[type="submit"]': 'submitPost'
	},

	submitPost: function( e ) {
		e.preventDefault();
		this.model.save();
	}
});