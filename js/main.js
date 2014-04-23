$(document).ready(function() {
	$(document)
		.on('click', '.presentation-mode', presentationMode)
		.on('click', '.prev-slide', prevSlide)
		.on('click', '.next-slide', nextStep);

	var start = window.location.hash.substring(1);
	if (start === 'presentation') {
		presentationMode();
	}

});

function presentationMode() {
	$('body').toggleClass('site').toggleClass('presentation');
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
}