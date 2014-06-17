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
			},
			remote: {
				options: {
					repeat: 3,
					selenium: {
						hostname: "ondemand.saucelabs.com",
						port: "80",
						user: process.env.SAUCE_USERNAME,
						pwd: process.env.SAUCE_ACCESSKEY
					},
					browsers: [{
						browserName: 'chrome',
						version: 34
					}],
					couch: {
						server: 'http://axemclion.cloudant.com',
						database: 'perfslides',
						updateSite: true
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('perfjankie');
	grunt.loadTasks('./build');
	require('load-grunt-tasks')(grunt);

	grunt.registerTask('build', ['copy', 'less', 'ejs']);
	grunt.registerTask('default', ['clean', 'build', 'connect', 'watch']);
	grunt.registerTask('perf', ['clean', 'build', 'connect', 'gitData', 'perfjankie:local'])
};