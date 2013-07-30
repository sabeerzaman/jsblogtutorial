var Blog = Blog || {};

Blog.Views.Post = Backbone.View.extend({
	initialize: function() {
		if ( !this.model )
			throw 'No model defined';
	},

	render: function() {
		if ( this.model.isNew() ) {
			var $el = Backbone.$('<form>').attr({ class: 'post' });
			this.setElement( $el );
			this.$el.html(
				'<input type="text" class="title">' +
				'<input type="text" class="author">' +
				'<textarea class="body"></textarea>' +
				'<button type="submit" value="submit">Submit Post</button>'
			);
		}
		else {
			var $el = Backbone.$('<article>').attr({ class: 'post' }),
				m = this.model;
			this.setElement( $el );
			this.$el.html(
				'<header>' +
					'<h1 class="title">' + m.get('title') + '</h1>' +
					'<strong class="author">by ' + m.get('author') + '</strong>' +
					'<em class="modified">Updated: ' + m.get('modified').toLocaleString() + '</em>' +
					'<em class="created">Posted: ' + m.get('created').toLocaleString() + '</em>' +
				'</header>' +
				'<p class="body">' + m.get('body') + '</p>'
			);			
		}
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