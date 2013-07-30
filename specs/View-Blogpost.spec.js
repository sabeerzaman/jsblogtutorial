describe( '(Blog)Post View (for src/views/post.js)', function() {
	it( 'is defined', function() {
		expect( Blog.Views.Post ).toBeDefined();
	});

	it( 'should be a Backbone View', function() {
		expect( Blog.Views.Post.constructor ).toEqual( Backbone.View.constructor );
	});
});