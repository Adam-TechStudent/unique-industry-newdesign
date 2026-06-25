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