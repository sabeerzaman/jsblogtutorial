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
		'<label>Title: <input type="text" class="title"></label>' +
		'<label>Author: <input type="text" class="author"></label>' +
		'<label>Body: <textarea class="body"></textarea></label>' +
		'<button type="submit" value="submit">Submit Post</button>',

	readTemplate:
		'<header>' +
			'<h1 class="title"><%= title %></h1><img class="edit" data-target="title">' +
			'by <strong class="author"><%= author %></strong><img class="edit" data-target="author">' +
			'<em class="modified">Updated: <%= modified.toLocaleString() %></em>' +
			'<em class="created">Posted: <%= created.toLocaleString() %></em>' +
		'</header>' +
		'<p class="body"><%= body %></p><img class="edit" data-target="body">' +
		'<button type="submit" value="submit" disabled="disabled">Save Changes</button>',

	initialize: function() {
		if ( !this.model )
			throw 'No model defined';

		this.listenTo( this.model, 'change:title change:author change:body', this.enableSaveBtn );
		this.listenTo( this.model, 'sync', this.changeUpdatedTime );
	},

	enableSaveBtn: function() {
		this.$( 'button[type="submit"]' ).prop( 'disabled', false );
	},

	changeUpdatedTime: function() {
		this.$( '.modified' ).text( 'Updated: ' + this.model.get( 'modified' ).toLocaleString() );
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
			value = $target.text(),
			that = this;

		if ( targetClass != 'body' )
			$editableField = $('<input class="'+targetClass+'" value="'+value+'" type="text" />');
		else
			$editableField = $('<textarea class="'+targetClass+'" type="text">'+value+'</textarea>');

		$editableField.one('blur', function( e ) {
			var newValue = $( e.currentTarget ).val();
			that.model.set( targetClass, newValue );
			$( this ).replaceWith( $target );
			$target.text( newValue );
		});

		$target.replaceWith( $editableField );
	}
});