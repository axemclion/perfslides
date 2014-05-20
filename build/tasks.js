module.exports = function(grunt) {

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
}