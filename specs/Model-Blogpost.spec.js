describe( '(Blog)Post Model (for src/models/post.js)', function() {
	it( 'is defined', function() {
		expect( Blog.Models.Post ).toBeDefined();
	});
	it( 'should be a Backbone Model', function() {
		expect( Blog.Models.Post.constructor ).toEqual( Backbone.Model.constructor );
	});
});