module.exports = function(grunt) {

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
	
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		JsCorDir: '_assets/js/core/',
		JsMiscDir: '_assets/js/misc/',
		JsStartDir: '_assets/js/startup/',
		JsAppDir: '_assets/js/app/',
		jsDir: '_assets/js/',
		jsPubDir: 'publish/_assets/js/',
		cssDir: '_assets/css/',
		sassDir: '_assets/sass/',
		cssPubDir: 'publish/_assets/css/',

		cssc: {
			build: {
				files: {
					'_assets/css/main.css' : '_assets/css/main.css'
				}
			}
		},

		cssmin: {
			build: {
				src: ['<%= cssDir %>*.css'],
				dest: '<%= cssPubDir %>main.<%= pkg.name %>.css'
			}
		},

		sass: {
			dev: {
				options: {
					style: 'expanded',
					check: true,
					lineNumbers: true
				}
			},
			build: {
				files: {
					'_assets/css/main.css' : '_assets/sass/main.scss'
				}
			}
		},

		uglify: {
			build: {
				files: {
					'<%= jsPubDir %>core.<%= pkg.name %>.min.js' : ['<%= JsCorDir %>**/*.js'],
					'<%= jsPubDir %>misc.<%= pkg.name %>.min.js' : ['<%= JsMiscDir %>**/*.js'],
					'<%= JsStartDir %>startup.<%= pkg.name %>.min.js' : ['<%= JsStartDir %>**/*.js']
				}
			}
		},
		//Only want to JS Lint the Application directory since all other files
		// are libraries and would throw unnecssary errors
		jshint: {
			all: ['<%= JsAppDir %>**/*.js']

		},
		clean: ["<%= cssDir %>main.css"],
		watch: {
			css: {
				files: ['<%= sassDir %>**/*.scss'],
				tasks: ['compile']
			},
			js: {
				files: ['<%= JsAppDir %>**/*.js'],
				tasks: ['jshint']
			}
		}

	});

	grunt.registerTask('default', []);

	grunt.registerTask('compile', ["clean","sass"]);

	grunt.registerTask('lint', ["jshint"]);

	grunt.registerTask('build', ["clean","uglify", "sass:build", "cssc", "cssmin"]);

};