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
			'<textarea class="body"></textarea>'
			);
		return this;
	}
});