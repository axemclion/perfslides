module.exports = function(grunt) {
	grunt.initConfig({
		clean: ['./bin'],
		connect: {
			site: {
				options: {
					hostname: '*',
					port: 8080,
					livereload: true,
					base: ['./bower_components', './www', './bin']
				}
			}
		},
		less: {
			site: {
				files: {
					'./bin/css/main.css': './www/less/main.less'
				}
			}
		},
		ejs: {
			site: {
				options: grunt.file.readJSON('package.json'),
				src: ['./www/ejs/*.ejs'],
				dest: './bin/index.html',
				expand: false,
				ext: '.html',
			}
		},
		copy: {
			site: {
				expand: true,
				cwd: './www',
				src: ['js/**/*.js', 'fonts/*.*', 'img/*.*'],
				dest: './bin'
			},
			bower: {
				expand: true,
				cwd: './bower_components',
				src: ['**/*.*'],
				dest: './bin'
			}
		},
		watch: {
			less: {
				files: ['./www/less/*.less'],
				tasks: ['less'],
				options: {
					livereload: true
				}
			},
			ejs: {
				files: ['./www/ejs/**/*.ejs'],
				tasks: ['ejs']
			}
		},
		perfjankie: {
			options: {
				suite: 'perfSlides - Performance Analysis',
				urls: ['http://localhost:8080']
			},
			local: {
				options: {
					selenium: 'http://localhost:4444/wd/hub',
					browsers: 'chrome',
					couch: {
						server: 'http://localhost:5984',
						database: 'perfslides',
						updateSite: true
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('perfjankie');

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('gitData', function() {
		var done = this.async();
		var exec = require('child_process').exec;
		exec('git log --format=%B -n 1', function(err, stdout, stderr) {
			var tag = stdout.match(/<deploy:[\S]*>/ig)[0].replace(/<deploy:|>/g, '');
			var seq = stdout.match(/<seq:[\S]*>/ig)[0].replace(/<seq:|>/g, '');
			var perfjankie = grunt.config.get('perfjankie');
			perfjankie.local.options.run = tag.substring(0, 10);
			perfjankie.local.options.time = seq;
			grunt.config.set('perfjankie', perfjankie);
			done();
		});
	});

	grunt.registerTask('build', ['copy', 'less', 'ejs']);
	grunt.registerTask('default', ['clean', 'build', 'connect', 'watch']);
	grunt.registerTask('perf', ['clean', 'build', 'connect', 'gitData', 'perfjankie:local'])
};