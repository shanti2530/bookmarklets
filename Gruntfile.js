module.exports = function(grunt) {

	require("load-grunt-tasks")(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        jshint: {
            bookmarklet: ['src/bookmarklet/*.js', 'src/*.js'],
            chromeextension: ['src/chrome-extension/*.js', 'src/*.js', 'chrome-extension/*.js'],
            options: {
                jshintrc: ".jshintrc"
            }
        },
        copy: {
            bookmarklet: { 
                files: [
                    {src: 'src/*.js', dest: 'gen/bookmarklet/', flatten: true, expand:true, filter: 'isFile'},
                    {src: 'src/bookmarklet/*.js', dest: 'gen/bookmarklet/', flatten: true, expand:true, filter: 'isFile'}
                ]
            },
            chromeextension: { 
                files: [
                    {src: 'src/*.js', dest: 'gen/chrome-extension/', flatten: true, expand:true, filter: 'isFile'},
                    {src: 'src/chrome-extension/*.js', dest: 'gen/chrome-extension/', flatten: true, expand:true, filter: 'isFile'}
                ]
            },
            bookmarkletdist: {
                files: [
                    {src: 'gen/bookmarklet/fillForms.min.js', dest: 'dist/bookmarklet/fillForms.min.js'}
                ]
            },
            chromeextensiondist: {
                files: [
                    {src: 'gen/chrome-extension/fillForms.min.js', dest: 'dist/chrome-extension/fillForms.min.js'},
                    {src: 'gen/chrome-extension/fillForms.min.js', dest: 'chrome-extension/scripts/fillForms.min.js'},
                    {src: 'bower_components/momentjs/min/moment.min.js', dest: 'chrome-extension/scripts/moment.min.js'},
                    {src: 'gen/chrome-extension/systemdefaults.js', dest: 'chrome-extension/scripts/systemdefaults.js'},
                    {src: 'gen/chrome-extension/utils.js', dest: 'chrome-extension/scripts/utils.js'}
                ]
            }
        },
        includes: {
            bookmarklet: {
                src: ["gen/bookmarklet/*.js"],
                dest: "gen/bookmarklet",
                flatten: true
            },
            chromeextension: {
                src: ["gen/chrome-extension/*.js"],
                dest: "gen/chrome-extension",
                flatten: true
            },
            chromeextensionBack: {
                src: ["chrome-extension/background.js"],
                dest: "chrome-extension/background.js",
                flatten: true
            }
        },
        uglify: {
			bookmarklet:{
                files: {
    				'gen/bookmarklet/fillForms.min.js': ['bower_components/momentjs/min/moment.min.js','gen/bookmarklet/fillForms.js']
    			}
            },
            chromeextension: {
                files: {
                    'gen/chrome-extension/fillForms.min.js': ['gen/chrome-extension/fillForms.js']
                }
            },
            options: {
                mangle: false,
                banner: "javascript:"
            }
        },
        watch: {
            bookmarklet: {
                files: ['**/*.js'],
                tasks: ['copy:bookmarklet', 
                        'includes:bookmarklet', 
                        'uglify:bookmarklet', 
                        'copy:bookmarkletdist', 
                        'jshint:bookmarklet'],
                options: {
                    spawn: false
                },
            },
            chromeextension: {
                files: ['**/*.js'],
                tasks: ['copy:chromeextension', 
                        'includes:chromeextension', 
                        'uglify:chromeextension', 
                        'copy:chromeextensiondist', 
                        'includes:chromeextensionBack', 
                        'jshint:chromeextension'],
                options: {
                    spawn: false
                },
            },
        }
    });

    // Default task(s).
    grunt.registerTask('bookmarklet', ['watch:bookmarklet']);
    grunt.registerTask('chromeextension', ['watch:chromeextension']);
};