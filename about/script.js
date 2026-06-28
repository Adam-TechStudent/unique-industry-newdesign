function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150; // Trigger point

        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

// Attach event listener for scrolling
window.addEventListener('scroll', revealOnScroll);

// Initial check on page load to reveal top elements
window.addEventListener('load', revealOnScroll);