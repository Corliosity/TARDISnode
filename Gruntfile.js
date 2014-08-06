module.exports = function(grunt) {

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
	
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		jsDir: '_assets/js/',
		jsPubDir: 'build/_assets/js/',
		cssDir: '_assets/css/',
		cssPubDir: 'build/_assets/css/',

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
					'<%= jsPubDir %>main.<%= pkg.name %>.min.js' : ['<%= jsDir %>**/*.js']
				}
			}
		},

		watch: {
			css: {
				files: ['_assets/sass/**/*.scss'],
				tasks: ['buildcss']
			},
			js: {
				files: ['/_assets/js/**/*.js'],
				tasks: ['uglify']
			}
		}

	});

	grunt.registerTask('default', []);

	grunt.registerTask('buildcss', ["sass", "cssc", "cssmin"]);

	grunt.registerTask('buildjs', ["uglify"]);

	grunt.registerTask('build', ["uglify", "sass", "cssc", "cssmin"]);

};