const carouselContainer = document.querySelector(".simple-carousel");
const carouselWrapper = carouselContainer.querySelector(".simple-carousel--wrapper");
const slides = Array.from(carouselWrapper.children);
const prevSlideBtn = carouselContainer.querySelector(".simple-carousel--nav.button-prev");
const nextSlideBtn = carouselContainer.querySelector(".simple-carousel--nav.button-next");
const carouselDots = carouselContainer.querySelector(".simple-carousel--dots");
const carouselDotIndicators = Array.from(carouselDots.children);

const slideWidth = slides[0].getBoundingClientRect().width;
// console.log(slideWidth);

// position the slides next to one another
const setSlidePosition = (slide, index) => {
	slide.style.left = `${slideWidth * index}px`;
};
slides.forEach(setSlidePosition);

// Move/scroll to the slide
const moveToTargetSlide = (carouselWrapper, currentSlide, targetSlide) => {
	// const amountToMove = targetSlide.style.left;
	carouselWrapper.style.transform = `translateX(-${targetSlide.style.left})`;
	currentSlide.classList.remove("active");
	targetSlide.classList.add("active");
};

// Clicking prev button will slide to prev slide
prevSlideBtn.addEventListener("click", () => {
	const currentSlide = carouselWrapper.querySelector(".simple-carousel--slide.active");
	const prevSlide = currentSlide.previousElementSibling;
	// const amountToMove = prevSlide.style.left;

	// carouselWrapper.style.transform = `translateX(-${amountToMove})`;
	// currentSlide.classList.remove("active");
	// prevSlide.classList.add("active");

	moveToTargetSlide(carouselWrapper, currentSlide, prevSlide);
});

// Clicking next button will slide to next slide
nextSlideBtn.addEventListener("click", () => {
	const currentSlide = carouselWrapper.querySelector(".simple-carousel--slide.active");
	const nextSlide = currentSlide.nextElementSibling;
	// const amountToMove = nextSlide.style.left;

	// carouselWrapper.style.transform = `translateX(-${amountToMove})`;
	// currentSlide.classList.remove("active");
	// nextSlide.classList.add("active");

	moveToTargetSlide(carouselWrapper, currentSlide, nextSlide);
});

// Clicking pagination dots will move to the target slide
carouselDotIndicators.forEach((dot, index) => {
	dot.addEventListener("click", (event) => {
		// console.log(dot, index);

    const currentDot = carouselDots.querySelector(".active");
    const targetDot = event.target;

		const currentSlide = carouselWrapper.querySelector(".simple-carousel--slide.active");
		const targetSlide = slides[index];
		moveToTargetSlide(carouselWrapper, currentSlide, targetSlide);

    currentDot.classList.remove("active");
    targetDot.classList.add("active");
	});
});
