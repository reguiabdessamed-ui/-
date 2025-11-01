// Presentation Navigation Script
let currentSlide = 1;
const totalSlides = 7;

// Get elements
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideCounter = document.getElementById('slideCounter');

// Initialize
updateSlideCounter();

// Navigation functions
function showSlide(slideNumber) {
    // Remove active class from all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Add active class to current slide
    const targetSlide = document.querySelector(`[data-slide="${slideNumber}"]`);
    if (targetSlide) {
        targetSlide.classList.add('active');
    }

    currentSlide = slideNumber;
    updateSlideCounter();
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        showSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 1) {
        showSlide(currentSlide - 1);
    }
}

function updateSlideCounter() {
    slideCounter.textContent = `${currentSlide} / ${totalSlides}`;
}

// Event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
    } else if (e.key === 'Home') {
        e.preventDefault();
        showSlide(1);
    } else if (e.key === 'End') {
        e.preventDefault();
        showSlide(totalSlides);
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - next slide
            nextSlide();
        } else {
            // Swiped right - previous slide
            prevSlide();
        }
    }
}

// Add smooth animations on load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});