module.exports = function(grunt) {
	var commit = {
		date: [],
		hash: []
	};
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
				urls: ['http://localhost:8080'],
				time: commit.date,
				run: commit.hash
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

	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('perfjankie');

	grunt.registerTask('gitData', function() {
		var done = this.async();
		var exec = require('child_process').exec;
		exec('git show -s --format=%ct', function(err, stdout, stderr) {
			commit.date.push(stdout);
			exec('git rev-parse HEAD', function(err, stdout, stderr) {
				commit.hash.push(stdout.substring(0, 6));
				done();
			})
		});
	})

	grunt.registerTask('build', ['copy', 'less', 'ejs']);
	grunt.registerTask('default', ['clean', 'build', 'connect', 'watch']);
	grunt.registerTask('perf', ['clean', 'build', 'connect', 'gitData', 'perfjankie'])
};