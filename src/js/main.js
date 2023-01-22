const carouselContainer = document.querySelector(".simple-carousel");
const carouselWrapper = carouselContainer.querySelector(".simple-carousel--wrapper");
const slides = Array.from(carouselWrapper.children);
const prevSlideBtn = carouselContainer.querySelector(".simple-carousel--nav.button-prev");
const nextSlideBtn = carouselContainer.querySelector(".simple-carousel--nav.button-next");
const carouselDots = carouselContainer.querySelector(".simple-carousel--dots");
const carouselDotIndicators = Array.from(carouselDots.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// position the slides next to one another
const setSlidePosition = (slide, index) => {
	slide.style.left = `${slideWidth * index}px`;
};
slides.forEach(setSlidePosition);

// Move/scroll to the slide
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

// Clicking prev button will move to prev slide
prevSlideBtn.addEventListener("click", () => {
  // Changing slide
	const currentSlide = carouselWrapper.querySelector(".simple-carousel--slide.active");
	const prevSlide = currentSlide.previousElementSibling;
	moveToTargetSlide(carouselWrapper, currentSlide, prevSlide);

  // Updating active dot style
	const currentDot = carouselDots.querySelector(".active");
	const prevDot = currentDot.previousElementSibling;
	updateActiveDot(currentDot, prevDot);
});

// Clicking next button will move to next slide
nextSlideBtn.addEventListener("click", () => {
  // Changing slide
	const currentSlide = carouselWrapper.querySelector(".simple-carousel--slide.active");
	const nextSlide = currentSlide.nextElementSibling;
	moveToTargetSlide(carouselWrapper, currentSlide, nextSlide);

  // Updating active dot style
	const currentDot = carouselDots.querySelector(".active");
	const nextDot = currentDot.nextElementSibling;
	updateActiveDot(currentDot, nextDot);
});

// Clicking pagination dots will move to the target slide
carouselDotIndicators.forEach((dot, index) => {
	dot.addEventListener("click", (event) => {
		// Changing slide
		const currentSlide = carouselWrapper.querySelector(".simple-carousel--slide.active");
		const targetSlide = slides[index];
		moveToTargetSlide(carouselWrapper, currentSlide, targetSlide);

		// Updating active dot style
		const currentDot = carouselDots.querySelector(".active");
		const targetDot = event.target;
		updateActiveDot(currentDot, targetDot);
	});
});
