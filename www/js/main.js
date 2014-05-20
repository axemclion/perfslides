var isPresentationRunning = false;
$(document).ready(function() {
	$(document)
		.on('click', '.presentation-mode', presentationMode)
		.on('click', '.prev-slide', prevSlide)
		.on('click', '.next-slide', nextStep)
		.on('keydown', function(e) {
			if (isPresentationRunning) {
				switch (e.keyCode) {
					case 37:
						prevSlide();
						break;
					case 39:
					case 32:
					case 13:
						nextStep();
						break;
					case 27:
						presentationMode();
				}
			}
		});

	var start = window.location.hash.substring(1);
	if (start.indexOf('presentation') !== -1) {
		presentationMode();
		var slide = parseInt(start.replace(/presentation&/, ''));
		if (typeof slide !== 'number' || isNaN(slide)) {
			slide = 0;
		}
		gotoSlide(slide - 1);
	}

});

function gotoSlide(slideNum) {
	currentStep = 0, currentSlide = 0;
	$('body').scrollTop(0);
	changeSlide(slideNum + 1);
}

function presentationMode() {
	isPresentationRunning = !isPresentationRunning;

	if (isPresentationRunning) {
		var bodyTop = $('body').scrollTop(),
			slide = 0;
		var slides = $('.slides>li');
		for (var i = 0; i < slides.length; i++) {
			if ($(slides[i]).offset().top < bodyTop) {
				slide = i;
			} else {
				break;
			}
		}
	}

	$('body').toggleClass('site').toggleClass('presentation');
	if (isPresentationRunning) {
		gotoSlide(slide - 1);
	}
}

var currentSlide = 0,
	currentStep = 0;

function nextStep() {
	var step = $('.slides>li').eq(currentSlide).find('.step').eq(currentStep);
	if (step.length === 0) {
		// No more steps on this slide, goto next slide
		changeSlide(+1);
	} else {
		// Show the next step
		currentStep++;
		step.css('opacity', 1);
	}
}

function prevSlide() {
	changeSlide(-1);
}

function changeSlide(nextSlide) {
	$('.slides>li').eq(currentSlide).find('.step').css('opacity', 0);

	currentSlide += nextSlide;
	if (currentSlide < 0) {
		currentSlide = 0;
	}
	var slides = $('.slides>li');
	if (currentSlide > slides.length) {
		currentSlide = slides.length - 1;
	}
	currentStep = 0;
	$('.slides').css('top', (-currentSlide * 100) + '%');
	document.location.href = '#presentation&' + currentSlide;
}