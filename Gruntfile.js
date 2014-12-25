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
		},
		connect: {
			server:{
				options: {
					keepalive: true
				}
			}

		}

	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');

	// Default task.
	grunt.registerTask('default', [ 'copy', 'connect' ]);

};
