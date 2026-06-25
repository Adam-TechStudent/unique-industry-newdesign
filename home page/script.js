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
    let showcaseInterval;

    function goToSlide(nextIndex) {
        // 1. Setup variables for outgoing and incoming slides
        const exitingSlide = slides[currentSlideIndex];
        const incomingSlide = slides[nextIndex];

        // 2. Trigger exit animation states
        exitingSlide.classList.remove("active");
        exitingSlide.classList.add("exit");
        indexItems[currentSlideIndex].classList.remove("active");
        detailsCard.classList.add("fade-out");

        // Clean up the exit class after animation finishes
        const oldIndex = currentSlideIndex;
        setTimeout(() => {
            slides[oldIndex].classList.remove("exit");
        }, 1200);

        // 3. Update index tracker to the new slide
        currentSlideIndex = nextIndex;

        // 4. Update UI indicator active state
        indexItems[currentSlideIndex].classList.add("active");

        // 5. Gather data from incoming slide
        const nextName = incomingSlide.getAttribute("data-name");
        const nextPrice = incomingSlide.getAttribute("data-price");
        const nextMade = incomingSlide.getAttribute("data-made");

        // 6. Swap content halfway through the fade
        setTimeout(() => {
            nameElem.textContent = nextName;
            priceElem.textContent = nextPrice;
            madeElem.textContent = nextMade;
            detailsCard.classList.remove("fade-out");
        }, 350);

        // 7. Reveal incoming slide
        incomingSlide.classList.add("active");
    }

    function rotateShowcase() {
        const nextIndex = (currentSlideIndex + 1) % totalSlides;
        goToSlide(nextIndex);
    }

    // --- Interactive Sidebar Click Engine ---
    indexItems.forEach((item) => {
        item.addEventListener("click", () => {
            const targetIndex = parseInt(item.getAttribute("data-index"), 10);
            
            // Do nothing if they click the already active item
            if (targetIndex === currentSlideIndex) return;

            // Stop the auto-timer, switch slides, restart the timer
            clearInterval(showcaseInterval);
            goToSlide(targetIndex);
            startAutoRotation(); 
        });
    });

    // --- Interval Controller Engine ---
    function startAutoRotation() {
        showcaseInterval = setInterval(rotateShowcase, intervalTime);
    }

    // Fire engine
    startAutoRotation();
});































document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const successCard = document.getElementById("successMessage");
    const backBtn = document.getElementById("backBtn");
    const themeToggle = document.getElementById("checkbox");

    // Form inputs
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");


    // --- 2. Dynamic Input Validation ---
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const checkInput = (input, condition) => {
        const inputGroup = input.parentElement;
        if (condition) {
            inputGroup.classList.remove("error");
            return true;
        } else {
            inputGroup.classList.add("error");
            return false;
        }
    };

    nameInput.addEventListener("blur", () => checkInput(nameInput, nameInput.value.trim() !== ""));
    emailInput.addEventListener("blur", () => checkInput(emailInput, isValidEmail(emailInput.value.trim())));
    messageInput.addEventListener("blur", () => checkInput(messageInput, messageInput.value.trim() !== ""));

    // --- 3. AJAX Form submission with Web3Forms API ---
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const isNameValid = checkInput(nameInput, nameInput.value.trim() !== "");
        const isEmailValid = checkInput(emailInput, isValidEmail(emailInput.value.trim()));
        const isMessageValid = checkInput(messageInput, messageInput.value.trim() !== "");

        if (isNameValid && isEmailValid && isMessageValid) {
            const formData = new FormData(form);
            const submitBtn = document.getElementById("submitBtn");
            
            // UI Feedback during processing
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.7";
            submitBtn.querySelector("span").textContent = "Sending...";

            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    form.classList.add("hidden");
                    successCard.classList.remove("hidden");
                } else {
                    alert("Something went wrong. Please check your setup or try again.");
                }
            } catch (error) {
                alert("Network error. Could not send message.");
            } finally {
                // Revert button styling
                submitBtn.disabled = false;
                submitBtn.style.opacity = "1";
                submitBtn.querySelector("span").textContent = "Send Message";
            }
        }
    });

     
});
















