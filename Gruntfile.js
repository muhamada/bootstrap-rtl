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
							'javascript/**', 'assets/**', 'dist/**', 'index.html' ],
					dest : '.'
				} ]
			}
		},
		connect: {
			server:{
				options: {
					keepalive: true,
					open: true
				}
			}

		},
		'string-replace': {
			main: {
				files: [{
					expand: true,
					src: ['components/index.html', 'css/index.html', 'javascript/index.html', 'examples/**/index.html', 'index.html'],
					dest: '.'
				}],
				options: {
					replacements: [{
					               pattern: '</head>',
					               replacement: "<!-- Bootstrap RTL Theme -->\n<link rel=\"stylesheet\" href=\"/dist/css/bootstrap-rtl.css\">\n\n</head>"
								   }]
				}				
			}
		}

	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-string-replace');
	
	// Default task.
	grunt.registerTask('default', [ 'copy', 'string-replace', 'connect' ]);

};
