document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".carousel-slide");
    const indexItems = document.querySelectorAll(".index-item");
    const detailsCard = document.querySelector(".product-details-card");
    
    const nameElem = document.getElementById("product-name");
    const priceElem = document.getElementById("product-price");
    const madeElem = document.getElementById("product-made");

    let currentSlideIndex = 0;
    const totalSlides = slides.length;
    const intervalTime = 5000; // Loop every 5 seconds

    function rotateShowcase() {
        // 1. Image rotation transitions
        const exitingSlide = slides[currentSlideIndex];
        exitingSlide.classList.remove("active");
        exitingSlide.classList.add("exit");

        // UI text fade stage
        detailsCard.classList.add("fade-out");

        // Clear out old active indicators on left track list
        indexItems[currentSlideIndex].classList.remove("active");

        setTimeout(() => {
            exitingSlide.classList.remove("exit");
        }, 1200);

        // 2. Step forward inside the array circle
        currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
        const incomingSlide = slides[currentSlideIndex];

        // 3. Update the left side vertical text indicator
        indexItems[currentSlideIndex].classList.add("active");

        // 4. Populate content changes
        const nextName = incomingSlide.getAttribute("data-name");
        const nextPrice = incomingSlide.getAttribute("data-price");
        const nextMade = incomingSlide.getAttribute("data-made");

        setTimeout(() => {
            nameElem.textContent = nextName;
            priceElem.textContent = nextPrice;
            madeElem.textContent = nextMade;
            detailsCard.classList.remove("fade-out");
        }, 350);

        // 5. Fire entry rotation arc
        incomingSlide.classList.add("active");
    }

    // Set interactive engine
    setInterval(rotateShowcase, intervalTime);
});