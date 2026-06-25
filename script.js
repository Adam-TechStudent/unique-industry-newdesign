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
















