/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Task configuration.
		copy : {
			main : {
				files : [ {
					expand : true,
					cwd : 'bootstrap/',
					src : [ 'css/**', 'components/**', 'examples/**',
							'javascript/**', 'assets/**', 'dist/**' ],
					dest : '.'
				} ]
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Default task.
	grunt.registerTask('default', ['copy']);

};
