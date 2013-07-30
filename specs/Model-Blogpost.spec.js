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

	describe( 'When saving to the server', function() {
		beforeEach(function() {
			this.server = sinon.fakeServer.create();
			this.post = new Blog.Models.Post({
				title: 'Test Post',
				body: 'Test Body'
			});
			this.post.save();
		});

		afterEach(function() {
			this.server.restore();
		});

		it( 'should send non-empty fields to server', function() {
			var request = this.server.requests[0],
				params = JSON.parse( request.requestBody );

			expect( params.title ).toEqual( 'Test Post' );
			expect( params.body ).toEqual( 'Test Body' );
			expect( params.created ).not.toBeNull();
			expect( params.modified ).not.toBeNull();
			expect( params.author ).not.toEqual( '' );
		});
	});
});