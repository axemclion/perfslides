$(document).ready(function() {
	// Div on the right that tells how much has scrolled

	$('<div>', {
		class: 'scrollCount'
	}).html('Ready').appendTo('body');

	$(document).on('scroll', function(e) {
		// How much has the document scrolled
		scrolledPercent = parseInt($('body').scrollTop() / ($(document).height() - $('body').height()) * 100);
		$('.scrollCount').html(scrolledPercent + ' %');
		
		if ($('.scrollCount').position().top + $('.scrollCount').height() + 50 >= $('body').height()) {
			scrolledPercent = parseInt(($('body').height() - 50 - $('.scrollCount').height())) + 'px';
		} else {
			scrolledPercent = scrolledPercent + '%';
		}

		// Position the scroll Div
		$('.scrollCount').animate({
			'top': scrolledPercent
		}, 1);

		// Save the scroll position
		document.cookie = 'scroll=' + scrolledPercent;
	});

	var scrolledPercent = document.cookie.match(/scroll=\S*/g);
	if (scrolledPercent) {
		scrolledPercent = scrolledPercent[0].split('=')[1];
	}
	$('body').scrollTop(parseInt(scrolledPercent) / 100 * ($(document).height() - $('body').height()));
});