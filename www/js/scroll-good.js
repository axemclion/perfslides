$(document).ready(function() {
	// Div on the right that tells how much has scrolled
	var scrollCount = $('<div>', {
		class: 'scrollCount'
	}).html('Ready').appendTo('body');

	var documentHeight = $(document).height(),
		scrollCountHeight = scrollCount.height();

	$(document).on('scroll', function(e) {
		var body = $('body'),
			bodyHeight = body.height();

		// How much has the document scrolled
		scrolledPercent = parseInt(body.scrollTop() / (documentHeight - bodyHeight) * 100);
		$('.scrollCount').html(scrolledPercent + ' %');

		// Position the scroll Div
		$('.scrollCount').css('-webkit-transform', 'translate3d(0,' + (scrolledPercent / 100 * bodyHeight) + 'px,0)');

		// Save the scroll position
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