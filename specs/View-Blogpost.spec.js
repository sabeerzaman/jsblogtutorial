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
});