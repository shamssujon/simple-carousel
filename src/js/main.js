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

// Clicking next will slide to next slide
nextSlideBtn.addEventListener("click", ()=>{
  const currentSlide = carouselWrapper.querySelector(".simple-carousel--slide.active");
  const nextSlide = currentSlide.nextElementSibling;
  const amountToMove = nextSlide.style.left;

  carouselWrapper.style.transform = `translateX(-${amountToMove})`
  currentSlide.classList.remove("active")
  nextSlide.classList.add("active")
})