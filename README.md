JSBlogTutorial
==============

## BitBucket Mercurial Repo

There is also a Mercurial repo maintained in BitBucket that mirrors this, in case that is preferred by anyone:
https://bitbucket.org/sabeerzaman/js-blog-tutorial

## Introduction

This project was created primarily as a teaching tool to introduce: 

* Test Driven Development in JavaScript
* BackboneJS for creating Rich Client Applications

The application itself is going to be a rich client blog - where you can edit your posts inline on the page instead of
navigating to a separate admin area. The **todo.txt** file is used as an informal capture tool where all features, user
stories, unit tests to write, unit tests written, notes, etc. are stored. Because it captures the initial vision of the
project, it is replicated at the end of this README.


## Pre-Development Setup

The initial few commits has the following already setup:

1.	__BLOG REST SERVER:__ A 'traditional' Node REST server using ExpressJS and Mongoose (to connect to MongoDB) is setup
		in _./node-server/blog-server.js_. Additionally, because this is deployed on an Apache server, the .htaccess file is
		included that is used to proxy requests to the server's route ('/blogposts').

2.	__"AJAX CRAWLER HELPER":__ There is also another Node server, defined in _node-server/web.js_ that intercepts 
		"_escaped_fragment_" requests from search engine crawlers (Google, Yahoo and Bing all implement this), runs 
		PhantomJS to render the HTML file before returning the output. The PhantomJS code is in 
		_node-server/phantom-server.js_. Again, there is a mod_rewrite directive in the .htaccess file to route all the
		"_escaped_fragment_" requests to the _web.js_ server.
		
3.	__KARMA TEST RUNNER CONFIG:__ The _karma.conf.js_ file is part of the repository to enable use of the Karma Test
		Runner to enable TDD. **NOTE: The Karma NPM package is NOT included in the package.json file or in the repository.
		It is recommended that Karma be installed globally using NPM to be run from anywhere on your dev machine.**
		
4.	__BUILD FILES:__ This project is deployed to an EC2 instance using Jenkins CI - which runs the included _build.bat_
		to run unit tests, stop/start node servers, and copy over files from the repository to the appropriate locations on
		the server. GruntJS is used to automate JS build tasks such as linting and running the unit tests, and the 
		configuration for the Grunt tasks are found in _Gruntfile.js_.


## How to use this

The commits to this repository are very granular, and every attempt has been made to commit every unit test along with
the code that makes it pass. Additionally, any refactoring are separate commits. The idea is to follow each commit step
and follow the TDD process by studying the test that is written, followed by the code used to make it pass. 
Additionally, the development progress is tracked informally in the todo.txt (a snapshot of which is replicated below).

**NOTE: There are certain commits that have been made which are NOT TDD, and some are bug fixes. These are evident in
that they usually don't have spec file committed in the changeset, and the word "refactor" is not used in the commit
message.

## Future plans

As it stands during the first commit of this readme, only a very small and incomplete portion of this project has been
completed. It is the author's plan to continue developing this to flesh it out as an example project that anyone can use
when trying to coach in the field of JavaScript. However, the author, fortunately and like a lot of us, has a day job,
so would love to get help on this and collaborate with others. **DISCLAIMER: The author (Sabeer Zaman) is a 
self-proclaimed "Noob" at JavaScript AND TDD, so please, please correct him at every turn!!**

Additionally, the author will attempt to develop series of articles that actually make use of this material to instruct
in JavaScript development. Maybe even use this application itself to write a blog in it? ;)

## TODO.TXT - Snapshot as of 2013/07/30

	JS "Blog Application"

	Legend: 
	'-' => "not done", '*' => "currently doing", 'x' => "complete", '!' => "complete, but not TDD"
	
	Minimum Marketable Feature:
	- list all blog posts (showing concatenated text)
		- fetch all blog posts from the server
		- display all posts (full) in a single page
		- concatenate post text when showing in full list
	- inline editing for blog posts from within full list view
	- support for tagging posts
	- show "tag cloud" - list all existing tags, and number of posts per tag
	- ability to filter visible posts by tag
	- alerts should be displayed for: success confirmations and errors

	x create a new post
	x view individual blog post
	x inline editing for blog posts from within single post view
	
	User Stories:
	- Create router to switch between:
		- new post form
		- individual post
		- list of posts
	
	x able to programmatically save post to server
	x validate for required fields before sending to server
	x HTML form to allow for entering fields for server
	x Submitting form will save underlying model to server
	x When rendering a post view with a "non-new" post, should display it normally (no form)
	x In single post view, able to edit any 'editable' field by clicking an icon next to it
	
	Tests:
	! "submitPost" method should update all the model values from the form fields.
	
	x Model initialization
	x Model default values
	x Save model to server
		x Change 'body' field to 'text' field before sending 
		x Sets the "created" + "modified" attributes to current time before sending to the server
		x Sets the "author" attribute to "Anonymous" if none specified
	x Model validation
		x Required: title, body
	x URL set on model corresponds to REST server route 
	x Rendered View for a new Post model has HTML fields for all the editable attributes
	x "submitPost" method should trigger the post to be saved to the server
	x clicking "Submit Post" button should trigger "submitPost" method
	x Rendering view with a model fetched from server should not render a form but rather display ALL the fields in appropriate markup
	x All editable fields have a "edit icon" (like a pencil?) next to them
	x Clicking edit image transforms area into input field
	x Pressing enter or removing focus from inline editable element should:
		x save it to model
		x change editable field back to its original form 
	x "Save Changes" button appears disabled on single post view until the model changes
	x Edits made on a page can be saved to the server by pressing "Save Changes" button
	x The "Updated: ..." label should be refreshed when changes are saved




