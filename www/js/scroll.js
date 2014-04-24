$(document).ready(function() {
	$('<div>', {
		class: 'scrollCount'
	}).html('Ready').appendTo('body');

	$(document).on('scroll', function(e) {
		scrolledPercent = parseInt($('body').scrollTop() / ($(document).height() - $('body').height()) * 100);
		$('.scrollCount').html(scrolledPercent + ' %');
		if ($('.scrollCount').position().top + $('.scrollCount').height() + 50 >= $('body').height()) {
			scrolledPercent = parseInt(($('body').height() - 50 - $('.scrollCount').height())) + 'px';
		} else {
			scrolledPercent = scrolledPercent + '%';
		}

		$('.scrollCount').animate({
			'top': scrolledPercent
		}, 1);

		document.cookie = 'scroll=' + scrolledPercent;
	});

	var scrolledPercent = document.cookie.match(/scroll=\S*/g);
	if (scrolledPercent) {
		scrolledPercent = scrolledPercent[0].split('=')[1];
	}
	$('body').scrollTop(parseInt(scrolledPercent) / 100 * ($(document).height() - $('body').height()));
});