const carouselContainer = document.querySelector(".simple-carousel");
const carouselWrapper = carouselContainer.querySelector(".simple-carousel--wrapper");
const slides = Array.from(carouselWrapper.children);

// Nagivations
const prevSlideBtn = carouselContainer.querySelector(".simple-carousel--nav.button-prev");
const nextSlideBtn = carouselContainer.querySelector(".simple-carousel--nav.button-next");

// Paginations
const carouselDotsContainer = carouselContainer.querySelector(".simple-carousel--dots");

// Setting active class to the first slide
slides[0].classList.add("active");

// position the slides next to one another
const slideWidth = slides[0].getBoundingClientRect().width;
const setSlidePosition = (slide, index) => {
	slide.style.left = `${slideWidth * index}px`;
};
slides.forEach(setSlidePosition);

// Move/scroll to the target slide
const moveToTargetSlide = (carouselWrapper, currentSlide, targetSlide) => {
	carouselWrapper.style.transform = `translateX(-${targetSlide.style.left})`;
	currentSlide.classList.remove("active");
	targetSlide.classList.add("active");
};

// Update Active dot style
const updateActiveDot = (currentDot, targetDot) => {
	currentDot.classList.remove("active");
	targetDot.classList.add("active");
};

// Checking if prevSlideBtn exists in the DOM
if (prevSlideBtn) {
	// Clicking prev button will move to prev slide
	prevSlideBtn.addEventListener("click", () => {
		// Changing slide
		const currentSlide = carouselWrapper.querySelector(".simple-carousel--slide.active");
		const prevSlide = currentSlide.previousElementSibling;
		moveToTargetSlide(carouselWrapper, currentSlide, prevSlide);

		// Updating active dot style
		if (carouselDotsContainer) {
			const currentDot = carouselDotsContainer.querySelector(".active");
			const prevDot = currentDot.previousElementSibling;
			updateActiveDot(currentDot, prevDot);
		}
	});
}

// Checking if nextSlideBtn exists in the DOM
if (nextSlideBtn) {
	// Clicking next button will move to next slide
	nextSlideBtn.addEventListener("click", () => {
		// Changing slide
		const currentSlide = carouselWrapper.querySelector(".simple-carousel--slide.active");
		const nextSlide = currentSlide.nextElementSibling;
		moveToTargetSlide(carouselWrapper, currentSlide, nextSlide);

		// Updating active dot style
		if (carouselDotsContainer) {
			const currentDot = carouselDotsContainer.querySelector(".active");
			const nextDot = currentDot.nextElementSibling;
			updateActiveDot(currentDot, nextDot);
		}
	});
}

// Checking if carouselDotsContainer exists in the DOM
if (carouselDotsContainer) {
	// for every slides, create a dot button
	slides.forEach(() => {
		const dotBtn = document.createElement("button");
		dotBtn.classList.add("simple-carousel--dot");
		carouselDotsContainer.appendChild(dotBtn);
	});

	const carouselDotIndicators = Array.from(carouselDotsContainer.children);

	// Setting active class to the first dot
	carouselDotIndicators[0].classList.add("active");

	// Clicking pagination dots will move to the target slide
	carouselDotIndicators.forEach((dot, index) => {
		dot.addEventListener("click", (event) => {
			const targetDot = event.target;
			const currentDot = carouselDotsContainer.querySelector(".active");
			const currentSlide = carouselWrapper.querySelector(".simple-carousel--slide.active");
			const targetSlide = slides[index];

			moveToTargetSlide(carouselWrapper, currentSlide, targetSlide);
			updateActiveDot(currentDot, targetDot);
		});
	});
}

// const autoPlay = (interval) => {
// 	setInterval(() => {
// 		// Changing slide
// 		const currentSlide = carouselWrapper.querySelector(".simple-carousel--slide.active");
// 		const nextSlide = currentSlide.nextElementSibling;
// 		moveToTargetSlide(carouselWrapper, currentSlide, nextSlide);

// 		// Updating active dot style
// 		const currentDot = carouselDots.querySelector(".active");
// 		const nextDot = currentDot.nextElementSibling;
// 		updateActiveDot(currentDot, nextDot);
// 	}, interval);
// };

// autoPlay(1000);
