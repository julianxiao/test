module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		wiredep: {
			task: {
				src: ['public/*.html']
			}
		},
		jshint: {
			files: "public/assets/js/*.js",
			options: {
				globals: {
					jQuery: true
				}
			}
		},
		watch: {

			browser_js: {
				files: ['<%= jshint.files %>'],
				tasks: ['jshint']
			},
			bower: {
				files: ['public/assets/vendor/*'],
				tasks: ['wiredep']
			}

		}
	});

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('changes', ['watch']);

};