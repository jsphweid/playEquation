'use strict'; 

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // copy
        copy: {
            main: {
                src: ['**/*', '!**/node_modules/**', '!**/offline/**', '!**/.gitignore', '!**/package.json', '!**/.git', '!**/Gruntfile.js', '!**/README.md'],
                expand: true,
                // cwd: 'compareInflections',
                dest: 'build'
            },
        },

        // clean
        clean: ['**/build'],

        'string-replace': {
            inline: {
                files: {
                    'build/': 'index.html'
                },
                options: {
                    replacements: [
                        {
                            pattern: '<link rel="stylesheet" href="src/offline/bootstrap.css">',
                            replacement: '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">'
                        },
                        {
                            pattern: '<link rel="stylesheet" href="src/offline/bootstrap-theme.css">',
                            replacement: '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">'
                        },
                        {
                            pattern: '<script src="src/offline/jquery3.1.1.js"></script>',
                            replacement: '<script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>'
                        },
                        {
                            pattern: '<script src="src/offline/bootstrap.js"></script>',
                            replacement: '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>'
                        }                      
                    ]
                }
            }
        },

        uglify: {
            development: {
                files: [{
                    expand: true,
                    cwd: './build/',
                    src: '**/js/*.js',
                    dest: './build/'
                }]
            },
            options: {
            }
        },

        babel: {
            options: {
                sourceMap: false,
                presets: ['es2015']
            },
            build: {
                expand: true,
                src: './build/js/*.js',
                dest: ''
            }
        },

        jshint: {
            // ignore_warning: {
            //     options: {
            //         '-W038': true
            //     }
            // }
            options: {
                esnext: true,
                '-W038': true,
                '-W033': true
            },
            files: ['js/*.js']
        },

        htmlhint: {
            templates: {
                options: {
                    'attr-lower-case': true,
                    'attr-value-not-empty': true,
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'id-class-value': true,
                    'id-class-unique': true,
                    'src-not-empty': true,
                    'img-alt-required': true
                },
                src: ['./*.html']
            }
        },

        htmlmin: {
            dev: {
                options: {
                    removeEmptyAttributes: true,
                    // removeEmptyElements: true,
                    removeRedundantAttributes: true,
                    removeComments: true,
                    removeOptionalTags: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    src: './build/*.html',
                    dest: ''
                }]
            }
        }
    });




    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('js-hint', ['jshint']);
    grunt.registerTask('html-hint', ['htmlhint']);
    grunt.registerTask('build', ['clean', 'copy', 'string-replace', 'babel', 'uglify', 'htmlmin']);

};