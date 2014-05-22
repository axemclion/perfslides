$(document).ready(function() {
	var scrollCount = $('<div>', {
		class: 'scrollCount'
	}).html('Ready').appendTo('body');

	var documentHeight = $(document).height(),
		scrollCountHeight = scrollCount.height();

	$(document).on('scroll', function(e) {
		var body = $('body'),
			bodyHeight = body.height();

		scrolledPercent = parseInt(body.scrollTop() / (documentHeight - bodyHeight) * 100);
		$('.scrollCount').html(scrolledPercent + ' %');

		$('.scrollCount').css('-webkit-transform', 'translate3d(0,' + (scrolledPercent / 100 * bodyHeight) + 'px,0)');

		window.requestAnimationFrame(function() {
			document.cookie = 'scroll=' + scrolledPercent;
		});
	});

	var scrolledPercent = document.cookie.match(/scroll=\S*/g);
	if (scrolledPercent) {
		scrolledPercent = scrolledPercent[0].split('=')[1];
	}
	$('body').scrollTop(parseInt(scrolledPercent) / 100 * ($(document).height() - $('body').height()));
});