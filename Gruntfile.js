module.exports = function(grunt) {

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
	
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		JsCorDir: '_assets/js/core/',
		JsMiscDir: '_assets/js/misc/',
		JsStartDir: '_assets/js/startup/',
		jsDir: '_assets/js/',
		jsPubDir: 'publish/_assets/js/',
		cssDir: '_assets/css/',
		cssPubDir: 'publish/_assets/css/',

		cssc: {
			build: {
				options: {
					consolidateViaDeclarations: true,
					consolidateViaSelectors: true,
					consolidateMediaQueries: true
				},
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

		jshint: {
			files: ['<%= JsCorDir %>**/*.js %>', '<%= JsMiscDir %>**/*.js', '<%= JsStartDir %>'],

			options: {
				globals: {
					jQuery: true,
					console: true
				}
			}

		},

		watch: {
			css: {
				files: ['_assets/sass/**/*.scss'],
				tasks: ['compile']
			},
			js: {
				files: ['/_assets/js/**/*.js'],
				tasks: ['jshint','uglify']
			}
		}

	});

	grunt.registerTask('default', []);

	grunt.registerTask('compile', ["sass", "cssc"]);

	grunt.registerTask('buildcss', ["sass", "cssc"]);

	grunt.registerTask('buildjs', ["uglify"]);

	grunt.registerTask('build', ["uglify", "sass", "cssc", "cssmin"]);

};