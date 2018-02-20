module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    var getLessVarsData = function () {
        var filePath = path.join(__dirname, 'less/variables.less');
        var fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
        var parser = new BsLessdocParser(fileContent);
        return { sections: parser.parseFile() };
    };

    var configBridge = grunt.file.readJSON('node_modules/bootstrap/grunt/configBridge.json', { encoding: 'utf8' });

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
        ' * Bootstrap v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
        ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed under the <%= pkg.license %> license\n' +
        ' */\n',
        jqueryCheck: configBridge.config.jqueryCheck.join('\n'),
        jqueryVersionCheck: configBridge.config.jqueryVersionCheck.join('\n'),


        less: {
            compileCore: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'style.css.map',
                    sourceMapFilename: 'dist/css/style.css.map'
                },
                src: 'less/bootstrap.less',
                dest: 'dist/css/style.css'
            }
        },

        autoprefixer: {
            options: {
                browsers: configBridge.config.autoprefixerBrowsers
            },
            core: {
                options: {
                    map: true
                },
                src: 'dist/css/style.css'
            }
        },

        cssmin: {
            options: {
                // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
                //    and then simplify the fix for https://github.com/twbs/bootstrap/issues/14837 accordingly
                compatibility: 'ie8',
                keepSpecialComments: '*',
                sourceMap: true,
                sourceMapInlineSources: true,
                advanced: false
            },
            minifyCore: {
                src: 'dist/css/style.css',
                dest: 'dist/css/style.min.css'
            }
        },

        copy: {
            css: {
                expand: true,
                cwd: 'dist/css/',
                src:'**',
                dest: 'html/css'
            }
        },

        connect: {
            server: {
                options: {
                    port: 3000,
                    base: 'html'
                }
            }
        },

        watch: {
            distCSS: {
                files: 'less/**/*.less',
                tasks: 'dist-css',
                options: {
                    livereload: true,
                    spawn: false,
                    reload: true
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
    require('time-grunt')(grunt);

    // CSS distribution task.
    grunt.registerTask('less-compile', ['less:compileCore']);
    grunt.registerTask('dist-css', ['less-compile', 'autoprefixer:core', 'cssmin:minifyCore', 'copy:css']);

    grunt.registerTask('server', ['connect:server:keepalive']);

    // Default task.
    grunt.registerTask('default', ['dist-css']);
};
