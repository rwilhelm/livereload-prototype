module.exports = function (grunt) {
    'use strict';

    //load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    //define tasks
    grunt.registerTask('server', ['connect:server', 'open:server', 'watch:server']);

    //env cfg
    var pkg = grunt.file.readJSON('package.json');
    var cfg = {
        appbase: './',
        src: 'js/',
        serverHost: '0.0.0.0',
        serverPort: 9000,
        livereload: 35729
    };  

    //grunt config
    grunt.initConfig({
        pkg: pkg,
        cfg: cfg,

        connect: {
            options: {
                port: cfg.serverPort,
                hostname: cfg.serverHost,
                middleware: function(connect, options) {
                    return [
                        require('connect-livereload')({
                            port: cfg.livereload
                        }),
                        // Serve static files.
                        connect.static(options.base),
                    ];
                }
            },
            server: {
                options: {
                    // keepalive: true,
                    base: cfg.appbase,
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:' + cfg.serverPort
            }
        },
        watch: {
            options: {
                livereload: cfg.livereload,
            },
            server: {
                files: [cfg.src + '/**'],
            },
        }
     });
};