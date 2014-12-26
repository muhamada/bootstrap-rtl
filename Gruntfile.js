module.exports = function(grunt) {
  "use strict";

  // Project configuration
  grunt.initConfig({
    // Read package.json Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*******************************************************************************\n' +
            ' *              <%= pkg.name %> (version <%= pkg.version %>)\n' +
            ' *      Author: <%= pkg.author %>\n' +
            ' *  Created on: <%= grunt.template.today("mmmm dd,yyyy") %>\n' +
            ' *     Project: <%= pkg.name %>\n' +
            ' *   Copyright: Unlicense.\n' +
            ' *******************************************************************************/\n',
    less: {
      rtl: {
        options: {
          strictMath: true,
          cleancss: false,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map' 
      },
        files: {
          'dist/css/<%= pkg.name %>.css': 'less/bootstrap-rtl.less'
        }
      },
      minify: {
        options: {
          cleancss: true
        },
        files: {
          'dist/css/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>.css',
        }
      }
    },

    usebanner: {
        options: {
          position: 'top',
          banner: '<%= banner %>',
          linebreak: true

        },
        files: {
          src: ['dist/css/<%= pkg.name %>.css', 'dist/css/<%= pkg.name %>.min.css']
        }        
    },
    
    copy: {
    	main:{
    		files: [{
    			expand: true,
    			cwd: 'bootstrap-docs/',
    			src: ['css/**', 'components/**', 'examples/**', 'javascript/**', 'assets/**', 'dist/**', 'index.html'],
    			dest: 'docs'
    		}]
    	}
    },
    
    'string-replace': {
    	main: {
    		files: [{
    			expand: true,
    			cwd: 'docs/',
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


// Load uglify plugin
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-banner');

// Default Task
grunt.registerTask('default', ['less', 'usebanner']);
};