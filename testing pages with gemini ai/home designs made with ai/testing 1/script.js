// 1. Dynamic Sticky Navigation Layout on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll to Top visibility logic
    if (window.scrollY > 400) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
});

// 2. Scroll Back to Top Action
document.getElementById('scrollTopBtn').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 3. Interactive Filtering for Textile Fabrics Grid
const filterButtons = document.querySelectorAll('.tab-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and add to the clicked one
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        productCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => { card.style.opacity = '1'; }, 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => { card.style.display = 'none'; }, 200);
            }
        });
    });
});

// 4. Testimonial Carousel Auto-Rotator Slider
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove('active'));
    dots.forEach((dot) => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function currentSlide(index) {
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
}

// Automatically change client quotes every 5 seconds
setInterval(() => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}, 5000);