describe( '(Blog)Post View (for src/views/post.js)', function() {
	it( 'is defined', function() {
		expect( Blog.Views.Post ).toBeDefined();
	});

	it( 'should be a Backbone View', function() {
		expect( Blog.Views.Post.constructor ).toEqual( Backbone.View.constructor );
	});

	it( 'should throw an error if initialized without a Post Model', function() {
		expect(function() {
			new Blog.Views.Post();
		}).toThrow( 'No model defined' );
	});

	describe( 'When rendered with a new Post model', function() {
		beforeEach(function() {
			this.view = new Blog.Views.Post({ model: new Backbone.Model() });			
			this.view.render();
		});
		
		it( 'should create a form with HTML input element per editable field', function() {
			expect( this.view.$el ).toBe( 'form.post' );
			expect( this.view.$el ).toContain( 'input.title' );
			expect( this.view.$el ).toContain( 'textarea.body' );
			expect( this.view.$el ).toContain( 'input.author' );
		});

		it( 'should have a "Submit Post" button', function() {
			expect( this.view.$el ).toContain( 'button[type="submit"]' );
			var $btn = this.view.$( 'button[type="submit"]' );
			expect( $btn ).toHaveText( 'Submit Post' );
			expect( $btn ).toHaveValue( 'submit' );
		});

		it( 'should save the model when the button is clicked', function() {
			var stub = sinon.stub( this.view.model, 'save' );
			this.view.delegateEvents();
			this.view.$( 'button[type="submit"]' ).click();
			expect( stub ).toHaveBeenCalledOnce();
		});
	});

	describe( 'When rendered with a fully-defined Post (from server)', function() {
		beforeEach(function() {
			this.model = new Backbone.Model({
				id: 1,
				title: 'First Blog Post',
				body: 'Hello World!',
				author: 'Yours Truly',
				created: new Date( '15 June 2012' ),
				modified: new Date( '01 January 2013' )
			});

			this.view = new Blog.Views.Post({ model: this.model });			
			this.view.render();
		});

		it( 'should display all Post attributes in read-only HTML markup', function() {
			expect( this.view.$el ).not.toBe( 'form' );
			expect( this.view.$el ).not.toContain( 'input' );
			expect( this.view.$el ).not.toContain( 'textarea' );

			expect( this.view.$el ).toBe( 'article.post' );
			expect( this.view.$( 'h1.title' ) ).toHaveText( 'First Blog Post' );
			expect( this.view.$( 'p.body' ) ).toHaveText( 'Hello World!' );
			expect( this.view.$( '.author' ) ).toHaveText( 'by Yours Truly' );
			expect( this.view.$( '.modified' ) ).toHaveText( 'Updated: ' +
				this.model.get('modified').toLocaleString() );
			expect( this.view.$( '.created' ) ).toHaveText( 'Posted: ' +
				this.model.get('created').toLocaleString() );
		});
	});
});