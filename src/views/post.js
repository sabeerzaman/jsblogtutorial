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
			'<h1 class="title"><%= title %></h1><img class="edit" data-target="title">' +
			'by <strong class="author"><%= author %></strong><img class="edit" data-target="author">' +
			'<em class="modified">Updated: <%= modified.toLocaleString() %></em>' +
			'<em class="created">Posted: <%= created.toLocaleString() %></em>' +
		'</header>' +
		'<p class="body"><%= body %></p><img class="edit" data-target="body">',	

	initialize: function() {
		if ( !this.model )
			throw 'No model defined';
	},

	render: function() {
		this.$el.html( _.template( _.result( this, 'template' ), this.model.attributes ) );
		return this;
	},

	events: {
		'click button[type="submit"]': 'submitPost',
		'click .edit': 'makeFieldEditable'
	},

	submitPost: function( e ) {
		e.preventDefault();
		this.model.save();
	},

	makeFieldEditable: function( e ) {
		var targetClass = $( e.currentTarget ).data('target'),
			$target = this.$( '.'+targetClass ),
			value = $target.text();

		if ( targetClass != 'body' )
			$target.replaceWith( $('<input class="'+targetClass+'" value="'+value+'" type="text" />') );
		else
			$target.replaceWith($('<textarea class="'+targetClass+'" type="text">'+value+'</textarea>'));
	}
});