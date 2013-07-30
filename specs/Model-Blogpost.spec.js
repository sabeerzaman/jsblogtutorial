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

			this.request = this.server.requests[0];
			this.params = JSON.parse( this.request.requestBody );
		});

		afterEach(function() {
			this.server.restore();
		});

		it( 'should be POSTing to the "/blogposts" route', function() {
			expect( this.request.method ).toEqual( 'POST' );
			expect( this.request.url ).toEqual( '/blogposts' );
		});

		it( 'should send the body field as text (server API requires it)', function() {
			expect( this.params.text ).toEqual( 'Test Body' );
			expect( this.params.body ).toBeUndefined();					
		});

		it( 'should send created, modified and author as non-empty fields to server', function() {
			expect( this.params.created ).not.toBeNull();
			expect( this.params.modified ).not.toBeNull();
			expect( this.params.author ).not.toEqual( '' );
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

	describe( 'Model validation', function() {
		beforeEach(function() {
			this.post = new Blog.Models.Post();			
		});

		it( 'the validate method should be defined', function() {
			expect( this.post.validate ).toBeDefined();
			expect( typeof this.post.validate ).toEqual( 'function' );
		});

		it( 'should not be valid model if title and/or body are empty', function() {
			expect( this.post.isValid() ).toBeFalsy();

			this.post.set({ title: 'Test title', body: '' });
			expect( this.post.isValid() ).toBeFalsy();

			this.post.set({ title: '', body: 'Test body' });
			expect( this.post.isValid() ).toBeFalsy();

			this.post.set({ title: 'Test title', body: 'Test body' });
			expect( this.post.isValid() ).toBeTruthy();
		});
	});
});