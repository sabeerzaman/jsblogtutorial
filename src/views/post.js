var Blog = Blog || {};

Blog.Views.Post = Backbone.View.extend({
	tagName: 'form',
	className: 'post',

	initialize: function() {
		if ( !this.model )
			throw 'No model defined';
	},

	render: function() {
		this.$el.html(
			'<input type="text" class="title">' +
			'<input type="text" class="author">' +
			'<textarea class="body"></textarea>' +
			'<button type="submit" value="submit">Submit Post</button>'
			);
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