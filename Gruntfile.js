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
    			src: ['css/**', 'components/**', 'examples/**', 'javascript/**', 'assets/**', 'dist/**'],
    			dest: 'docs'
    		}]
    	}
    },
    
    'string-replace': {
    	main: {
    		files: [{
    			expand: true,
    			cwd: 'docs/',
    			src: ['components/index.html', 'css/index.html', 'javascript/index.html', 'examples/**/index.html'],
    			dest: 'docs/'    			
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
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-string-replace');

// Custom Task
grunt.registerTask('processFile', 'Process each file to generate clean output', function(filePath){
	try {
		 var fileContents =grunt.file.read(filePath);
		 
		 if (fileContents) {
			 var cheerio = require("cheerio");
			 var $ = cheerio.load(fileContents);
			 
			 //Insert bootstrap-rtl.css
			 $('head').append('\n<!-- bootsrap-rtl CSS -->\n<link rel="stylesheet" href="../dist/css/bootstrap-rtl.css">\n');
			 
			 //Remove carbonads-container
			 $('#carbonads-container').remove();
			 
			 //Remove unnecessary navbar list items
			 $('header#top a:contains("Getting started")').parent().remove(); //Getting Started
			 $('header#top a:contains("Customize")').parent().remove(); //Customize
			 $('header#top a:contains("Expo")').parent().parent().remove(); //Blog and Expo (Remove the ul tag)
			 
			 //Remove footer
			 $('footer').remove();
			 //Write contents to file
			 grunt.file.write(filePath, $.html());
		 }
	}catch(err){
		grunt.log.error('Error while processing "' + filePath + '": ' + err);
		return false;
	}
		
	
});

// Default Task
grunt.registerTask('default', ['less', 'usebanner', 'copy', 'string-replace']);
};