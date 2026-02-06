// LUMA Slideshow
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let current = 0;
let autoplay;

// Create dots
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = `dot${i === 0 ? ' active' : ''}`;
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function goTo(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  
  current = (index + slides.length) % slides.length;
  
  slides[current].classList.add('active');
  dots[current].classList.add('active');
  
  resetAutoplay();
}

function next() {
  goTo(current + 1);
}

function prev() {
  goTo(current - 1);
}

function resetAutoplay() {
  clearInterval(autoplay);
  autoplay = setInterval(next, 6000);
}

prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

// Keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft') prev();
});

// Start
resetAutoplay();
