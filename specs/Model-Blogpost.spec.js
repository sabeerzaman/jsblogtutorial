describe( '(Blog)Post Model (for src/models/post.js)', function() {
	it( 'is defined', function() {
		expect( Blog.Models.Post ).toBeDefined();
	});

	it( 'should be a Backbone Model', function() {
		expect( Blog.Models.Post.constructor ).toEqual( Backbone.Model.constructor );
	});

	it( 'should have default fields', function() {
		var post = new Blog.Models.Post();
		expect( post.get( 'title' ) ).toEqual('');
		expect( post.get( 'body' ) ).toEqual('');
		expect( post.get( 'author' ) ).toEqual('');		
		expect( post.get( 'created' ) ).toBeNull();		
		expect( post.get( 'modified' ) ).toBeNull();		
	});
});