module.exports = function(grunt) {

	var banner = '/*\n<%= pkg.name %> <%= pkg.version %>';
    	banner += '- <%= pkg.description %>\n<%= pkg.repository.url %>\n';
    	banner += 'Built on <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n';
 

	//Normally when running Grunt you need to define all plug-ins being used seperately.
	// Using matchdep eliminates the need for this and will automatically load all plugins from the 
	// package.json directory.
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
	
	grunt.initConfig({

		//First set up configuration variables and paths to files for grunt to read
		// Our package file is the basic set up of the application and contains
		// information such as the name, version, date, author, etc.
		pkg: grunt.file.readJSON('package.json'),

		// The configuration folder is where the paths for our Build Directory,
		// and working file paths will be stored.  This way if a directory is changed
		// or needs to be modified it can be done in one place.
		// TODO: make sure all files will read from this path
		configs: grunt.file.readJSON('direct.json'),

		//Set up Sass to CSS builds and concats
		// The first file just prepares our CSS build
		// We can also specify specific targets for our CSS to be built by
		// Creating an organized file before minimizing.
		// NOTE CSS CONDENSE also makes use of the Clean task
		// TODO: Look for method to combine SASS and CSSC Tasks
		cssc: {
	      options:{
	        sortSelectors: true,
	        lineBreaks: false,
	        sortDeclarations:true,
	        consolidateViaDeclarations:false,
	        consolidateViaSelectors:false,
	        consolidateMediaQueries:false,
	        compress: false,
	        safe: true
	      },
			build: {
				files: {
					'_assets/css/main.css' : '_assets/css/main.css'
				}
			}
		},

		//The Grunt CSS-Min plug-in will actually concatonate our CSS file and push it to the our
		// build directory, note that here we can also specify what specifically to name our project

		cssmin: {
			build: {
				src: ['<%= configs.cssDir %>*.css'],
				dest: '<%= configs.cssPubDir %>main.<%= pkg.name %>.css'
			}
		},

		// Sass is divided into a developer option and straight build configuration
		// Our developer option will leave the line numbers, and expanded style in place
		// This will make the debugging easier in finding what code is affected
		//TODO: Further sepearte dev and build tasks, to seperate logic without
		// having to re-write the task.

		sass: {
			dev: {
				options: {
					style: 'expanded',
					check: true,
					lineNumbers: true
				},
			},
			build: {
				files: {
					'<%= configs.cssDir %>/main.css' : '<%= configs.sassDir %>/main.scss'
				}
			}
		},

		// Minify the javascript files.
		// Note that we minify the files by the directories - TODO: Look for better method of handling multiple
		// Directories and files to minify.
		uglify: {
			build: {
				files: {
					'<%= configs.jsPubDir %>core.<%= pkg.name %>.min.js' : ['<%= configs.JsCorDir %>**/*.js'],
					'<%= configs.jsPubDir %>misc.<%= pkg.name %>.min.js' : ['<%= configs.JsMiscDir %>**/*.js'],
					'<%= configs.JsStartDir %>startup.<%= pkg.name %>.min.js' : ['<%= configs.JsStartDir %>**/*.js']
				}
			}
		},
		//Only want to JS Lint the Application directory since all other files
		// are libraries and would throw unavoidable errors.
		// Jshint task is set up with the watch command, once a change is made the file will
		// be automatically linted and checked for errors.
		jshint: {
			files: ['Gruntfile.js','<%= configs.JsAppDir %>**/*.js'],
			options: {
				maxlen: 80,
				reporterOutput: 'jshintOutput.xml'
			}
		},


		//Test out different Mocha/Jasmine Testing plugins,
		// Simple mocha seems to be the easiest to use
		simplemocha: {
			options: {
				globals: ['expect'],
				timeout: 3000,
				ui: 'bdd',
				reporter: 'tap'
			},
			all: ['test/*.js']
		},

		//Make sure to clean the CSS directory to avoid conflicts before building new Sass
		// When we begin building javascript or production builds will want to update
		// so that clean task will also clean the build folder before we update with new code.
		// Clean task is a part of CSSC build process
		//clean: ["<%= configs.cssDir %>main.css"],

		//Set up a watch command while developing
		// Files will be automatically run through specific tasks (see tasks referenced below in register task)
		// TODO: Add livereload in so files will be automatically updated and pushed out.
		// Note: it seems for a VM instance you could also include in the default tasks a call to an s/ftp plugin
		// To automatically push on watch
		watch: {
			css: {
				files: ['<%= configs.sassDir %>**/*.scss'],
				tasks: ['compile']
			},
			js: {
				files: ['<%= configs.JsAppDir %>**/*.js'],
				tasks: ['jshint']
			}
		}

		// Look into installing grunt-git plugin to run checkout/in processes 

	});

	grunt.registerTask('default', []);

	grunt.registerTask('compile', ["sass", "cssc"]);

	grunt.registerTask('lint', ["jshint"]);

	grunt.registerTask('build', ["clean","uglify", "sass:build", "cssc", "cssmin"]);

};