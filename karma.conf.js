// Karma configuration
// Generated on Mon Jul 29 2013 14:46:55 GMT-0400 (Eastern Daylight Time)


// base path, that will be used to resolve files and exclude
basePath = '';


// list of files / patterns to load in the browser
files = [
	JASMINE,
	JASMINE_ADAPTER,

	// Unit test plugins
	'vendor/sinon/sinon-1.6.0.js',
	'vendor/jasmine-sinon/jasmine-sinon.js',
	'vendor/jasmine-jquery/jasmine-jquery.js',

	// Third party libraries (order matters because of dependencies)
	'vendor/console-shim/console-shim-1.0.2.js',
	'vendor/jquery/jquery-1.9.1.js',
	'vendor/underscore/underscore-1.4.4.js',
	'vendor/backbone/backbone-1.0.0.js',

	// Namespace setup file: ALWAYS first from src files
	'src/namespace.js',

	// Backbone classes (again, order matters!)
	'src/models/**/*.js',
	'src/collections/**/*.js',
	'src/views/**/*.js',

	'*.js',

	// Test Fixtures
	'specs/fixtures/**/*.js',
	'fixturesPath-karma-only.js',
	{ pattern: 'specs/fixtures/*.html', watched:true, included:false, served:true },

	// Tests
	'specs/**/*.spec.js'
];


// list of files to exclude
exclude = [
	'karma.conf.js',
	'Gruntfile.js'
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome', 'Firefox', /*'Opera',*/ 'IE'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
