const carouselContainer = document.querySelector(".simple-carousel");
const carouselSlidesContainer = carouselContainer.querySelector(".simple-carousel--slides");
const slides = Array.from(carouselSlidesContainer.children);

// Nagivations
const prevSlideBtn = carouselContainer.querySelector(".simple-carousel--nav.button-prev");
const nextSlideBtn = carouselContainer.querySelector(".simple-carousel--nav.button-next");

// Paginations
const carouselDotsContainer = carouselContainer.querySelector(".simple-carousel--dots");

let carouselInterval = null;

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

// Checking if carouselDotsContainer exists in the DOM
if (carouselDotsContainer) {
	// for every slides, create a dot button
	slides.forEach(() => {
		const dotBtn = document.createElement("button");
		dotBtn.classList.add("simple-carousel--dot");
		carouselDotsContainer.appendChild(dotBtn);
	});
}

const carouselDotIndicators = Array.from(carouselDotsContainer.children);

// Setting active class to the first dot
carouselDotIndicators[0].classList.add("active");

// Clicking pagination dots will move to the target slide
carouselDotIndicators.forEach((dot, index) => {
	dot.addEventListener("click", (event) => {
		// Stop Autoplay
		clearInterval(carouselInterval);

		const targetDot = event.target;
		const currentDot = carouselDotsContainer.querySelector(".active");
		const currentSlide = carouselSlidesContainer.querySelector(".simple-carousel--slide.active");
		const targetSlide = slides[index];

		moveToTargetSlide(carouselSlidesContainer, currentSlide, targetSlide);
		updateActiveDot(currentDot, targetDot);
	});
});

// Checking if prevSlideBtn exists in the DOM
if (prevSlideBtn) {
	// Clicking prev button will move to prev slide
	prevSlideBtn.addEventListener("click", () => {
		// Stop Autoplay
		clearInterval(carouselInterval);

		// Changing slide
		const currentSlide = carouselSlidesContainer.querySelector(".simple-carousel--slide.active");

		let prevSlide = currentSlide.previousElementSibling;
		if (!prevSlide) {
			const lastSlide = slides.length - 1;
			prevSlide = slides[lastSlide];
		}

		moveToTargetSlide(carouselSlidesContainer, currentSlide, prevSlide);

		// Updating active dot style
		if (carouselDotsContainer) {
			const currentDot = carouselDotsContainer.querySelector(".active");

			let prevDot = currentDot.previousElementSibling;
			if (!prevDot) {
				const lastDot = carouselDotIndicators.length - 1;
				prevDot = carouselDotIndicators[lastDot];
			}

			updateActiveDot(currentDot, prevDot);
		}
	});
}

// Checking if nextSlideBtn exists in the DOM
if (nextSlideBtn) {
	// Clicking next button will move to next slide
	nextSlideBtn.addEventListener("click", () => {
		// Stop Autoplay
		clearInterval(carouselInterval);

		// Changing slide
		const currentSlide = carouselSlidesContainer.querySelector(".simple-carousel--slide.active");

		let nextSlide = currentSlide.nextElementSibling;
		if (!nextSlide) {
			nextSlide = slides[0];
		}

		moveToTargetSlide(carouselSlidesContainer, currentSlide, nextSlide);

		// Updating active dot style
		if (carouselDotsContainer) {
			const currentDot = carouselDotsContainer.querySelector(".active");

			let nextDot = currentDot.nextElementSibling;
			if (!nextDot) {
				nextDot = carouselDotIndicators[0];
			}

			updateActiveDot(currentDot, nextDot);
		}
	});
}

// Autoplay
const autoPlay = (interval) => {
	carouselInterval = setInterval(() => {
		// Changing slide
		const currentSlide = carouselSlidesContainer.querySelector(".simple-carousel--slide.active");

		let nextSlide = currentSlide.nextElementSibling;
		if (!nextSlide) {
			nextSlide = slides[0];
		}

		moveToTargetSlide(carouselSlidesContainer, currentSlide, nextSlide);

		// Updating active dot style
		if (carouselDotsContainer) {
			const currentDot = carouselDotsContainer.querySelector(".active");

			let nextDot = currentDot.nextElementSibling;
			if (!nextDot) {
				nextDot = carouselDotIndicators[0];
			}

			updateActiveDot(currentDot, nextDot);
		}
	}, interval);
};

autoPlay(2000);

// Lightbox
const lightbox = document.querySelector(".simple-carousel--lightbox");
const lightboxContent = document.createElement("div");
lightboxContent.classList.add("lightbox-content");

// for every slides, create a lightbox-item with image
slides.forEach((slide) => {
	const lightboxItem = document.createElement("div");
	lightboxItem.classList.add("lightbox-item");
	const img = document.createElement("img");
	img.setAttribute("src", `${slide.children[0].getAttribute("src")}`);
	lightboxItem.appendChild(img);
	lightboxContent.appendChild(lightboxItem);
});

lightbox.appendChild(lightboxContent);

// const lightboxItems = Array.from(lightboxContent.children);

const lightboxCloseBtn = document.createElement("button");
lightboxCloseBtn.innerText = "x";
lightboxCloseBtn.classList.add("lightbox-close-btn");

lightbox.appendChild(lightboxCloseBtn);

// Lightbox functionalities (borrowed from internet, need to improve)
let slideIndex = 1;
showSlide(slideIndex);

function openLightbox() {
	lightbox.style.display = "block";
}

function closeLightbox() {
	lightbox.style.display = "none";
}

function changeSlide(n) {
	showSlide((slideIndex += n));
}

function toSlide(n) {
	showSlide((slideIndex = n));
}

function showSlide(n) {
	const slides = document.getElementsByClassName("lightbox-item");

	if (n > slides.length) {
		slideIndex = 1;
	}

	if (n < 1) {
		slideIndex = slides.length;
	}

	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}

	slides[slideIndex - 1].style.display = "block";
}

slides.forEach((slide, index) => {
	slide.addEventListener("click", () => {
		openLightbox();
		toSlide(index + 1);
	});
});

lightboxCloseBtn.addEventListener("click", () => {
	closeLightbox();
});
