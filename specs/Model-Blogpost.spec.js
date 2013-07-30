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
			this.saveTime = Date.now();
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

		it( 'should set "created" and "modified" to the current time as a Date object', function() {
			var created = this.post.get('created'),
				modified = this.post.get('modified');

			expect( created ).toEqual( modified );
			expect( created.constructor ).toEqual( Date );
			// If within 5s of each other, reasonable to assume the time was set to "now"
			expect( this.saveTime - created ).toBeLessThan( 5000 );
		});

		it( 'should set author to "Anonymous" if not specified', function() {
			expect( this.post.get( 'author' ) ).toEqual( 'Anonymous' );
		});
	});
});