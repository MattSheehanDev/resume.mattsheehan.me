module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
          development: {
            options: {
              paths: ["assets/less/"]
            },
            files: {
              "assets/css/theme.css": "assets/less/theme.less"
            }
          }
        },
        cssmin: {
          options: {
            report: "min"
          },
          target: {
            files: {
              "assets/css/theme.min.css": "assets/css/theme.css"
              // "index.min.html": "index.html"
              // "build/index.min.html": "build/index.html"
            }
          }
        },
        watch: {
            styles: {
                files: [
                  'assets/less/**/*.less',
                  'jade/**/*.jade'
                ],
                tasks: [
                  'less',
                  'cssmin',
                  'exec:build_index',
                  'copy:assets',
                  // 'cssmin',
                ],
                options: {
                    nospawn: true
                }
            }
        },
        exec: {
            run_server: {
                cmd: "node serve.js"
            },
            build_index: {
                cmd: "node render.js"
            }
        },
        copy: {
            assets: {
              cwd: './',
              src: [
                'assets/images/**/*',
                'assets/fonts/**/*',
                'Matthew-Sheehan-PDF.pdf',
                'external/**/*'
              ],
              dest: './build/'
            },
            build: {
                cwd: './assets/css',
                src: [ 'theme.css' ],
                dest: './build/assets/css',
                expand: true
            },
            favicon: {
                cwd: './',
                src: [ 'favicon.ico' ],
                dest: './build/',
                expand: true
            }
        },
        clean: {
            build: {
                src: [ 'build', 'assets/css' ]
            }
        }
    });

    // Load the plugin that compiles less to css
    grunt.loadNpmTasks('grunt-contrib-less');

    // Load plugin to minify css
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Load the plugin that watches file changes
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Load the plugin to execute shell commands
    grunt.loadNpmTasks('grunt-exec');

    // Load the plugin to clean directories
    grunt.loadNpmTasks('grunt-contrib-clean')

    // Load the plugin to copy files
    grunt.loadNpmTasks('grunt-contrib-copy');



    // Default tasks
    grunt.registerTask('default', ['exec']);

    grunt.registerTask('build', [
        /* Uncomment this item once you've created your own resume.json file
           in the project root.  This will use your own data to build your site.
         */
        // 'copy:resumejson',
        'clean',
        'less',
        'cssmin',
        'exec:build_index',
        'copy:assets',
        // 'cssmin',
        /* Uncomment this item (and the comma above) if you add a favicon.ico
           in the project root. You'll also need to uncomment the <link...> tag
           at the top of resume.template.
         */
        // 'copy:favicon'
    ]);
    grunt.registerTask('serve', [
        'build',
        'exec:run_server'
    ])
}
