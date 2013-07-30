module.exports = function( grunt ) {
	grunt.initConfig({
		jasmine: {
			client: {
				src: ['src/namespace.js', 'src/**/*.js'],
				options: {
					keepRunner: true,
					junit: {
						path: './'
					},
					specs: 'specs/**/*.spec.js',
					vendor: [
						'vendor/console-shim/console-shim-1.0.2.js',
						'vendor/jquery/jquery-1.9.1.js',
						'vendor/sinon/sinon-1.6.0.js',
						'vendor/jasmine-sinon/jasmine-sinon.js',
						'vendor/jasmine-jquery/jasmine-jquery.js',
						'vendor/underscore/underscore-1.4.4.js',
						'vendor/backbone/backbone-1.0.0.js'
					],
					helpers: 'specs/fixtures/**/*.js'
				}
			}
		},

		jshint: {
			files: {
				src: ['./**/*.js'],
				filter: function( filepath ) {
					var isThirdParty = filepath.match( /node_modules[\/\\]/g ) ||
						filepath.match( /vendor[\/\\]/g ),
						isConfig = filepath.match( /.*(?:karma.conf.js)$/g );

					if ( !isThirdParty && !isConfig )
						console.log( 'Linting ' + filepath + '...' );

					return !isThirdParty && !isConfig;
				}
			},
			options: {
				bitwise: true,
				curly: false,
				eqeqeq: true,
				expr: true,
				forin: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				noempty: true,
				nonew: true,
				regexp: true,
				undef: true,
				strict: false,
				trailing: true,
				node: true,
				globals: {
					define: true,
					describe: true,
					beforeEach: true,
					afterEach: true,
					it: true,
					expect: true,
					runs: true,
					waits: true,
					waitsFor: true,
					window: true,
					document: true,
					jasmine: true,
					sinon: true,
					$: true,
					_: true
				}
			}
		},

		watch: {
			files: [
				'specs/**/*.js',
				'src/**/*.js',
				'specs/fixtures/html/*.html'
				],
			tasks: [ 'jasmine:client' ]
		}
	});

	grunt.loadNpmTasks( 'grunt-contrib-jasmine' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );

	grunt.registerTask( 'test', [ 'jasmine' ] );
	grunt.registerTask( 'default', [ 'jshint', 'test' ] );
};