// REPLACE THIS STRING WITH YOUR GENUINE WEB3FORMS ACCESS KEY
const WEB3FORMS_ACCESS_KEY = "778c1719-8969-4d35-91cd-17a827c8a9a2"; 

function setWeb3FormsKey() {
    const keyInput = document.getElementById('web3FormsKey');
    if (keyInput) keyInput.value = WEB3FORMS_ACCESS_KEY;
}

// Global state variables to keep track of the currently selected item's price
let currentBasePrice = 0;

// 1. Data Object (Now featuring a base price per yard/unit)
const products = [
    { id: 1, name: "Premium Egyptian Cotton", price: 15, desc: "100% Organic, 600 Thread Count", img: "https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Pure Mulberry Silk", price: 45, desc: "Luxurious, smooth 22 Momme silk", img: "https://images.unsplash.com/photo-1584143944369-a10ce17d4407?auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Belgian Linen", price: 25, desc: "Breathable, pre-washed flax linen", img: "https://images.unsplash.com/photo-1606744838346-7b47f0cf0564?auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "Merino Wool Blend", price: 35, desc: "Soft, thermal regulation wool", img: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=500&q=80" },
    { id: 5, name: "Raw Denim Twill", price: 20, desc: "Heavyweight 14oz selvedge cotton", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=80" },
    { id: 6, name: "Jacquard Brocade", price: 50, desc: "Intricate metallic floral weaves", img: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=500&q=80" },
    { id: 7, name: "Stretch Corduroy", price: 18, desc: "Vintage 11-wale soft ribbed fabric", img: "https://images.unsplash.com/photo-1582719471384-894fbb16e024?auto=format&fit=crop&w=500&q=80" },
    { id: 8, name: "Breathable Bamboo Viscose", price: 22, desc: "Eco-friendly, moisture-wicking jersey", img: "https://images.unsplash.com/photo-1528255671579-01b9e182ed1d?auto=format&fit=crop&w=500&q=80" },
    { id: 9, name: "Hearth Canvas", price: 30, desc: "Ultra-durable upholstery grade fabric", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=80" }
];

// 2. Loop to build the UI Grid (Includes Price badge now)
const grid = document.getElementById('productGrid');
if (grid) {
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="image-container">
                <img src="${product.img}" alt="${product.name}" class="product-img">
                <div class="image-overlay">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-desc">${product.desc}</p>
                    <p class="product-price"><strong>Price:</strong> $${product.price} / yard</p>
                </div>
            </div>
            <div class="card-body">
                <button class="order-btn" onclick="openOrderModal('${product.name.replace(/'/g, "\\'")}', ${product.price})">Order Now</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// 3. Modal Controllers
const modal = document.getElementById('orderModal');
const productNameInput = document.getElementById('productName');
const emailSubjectInput = document.getElementById('emailSubject');
const orderForm = document.getElementById('orderForm');
const submitBtn = document.getElementById('submitBtn');

// New inputs for handling dynamic calculations
const quantityInput = document.getElementById('quantity');
const totalPriceInput = document.getElementById('totalPrice');
const priceDisplay = document.getElementById('priceDisplay'); 

function openOrderModal(name, price) {
    currentBasePrice = price;
    
    if (productNameInput) productNameInput.value = name;
    if (emailSubjectInput) emailSubjectInput.value = `New Textile Order Request: ${name}`;
    
    // Set initial quantity to 1 and update calculation displays
    if (quantityInput) quantityInput.value = 1;
    updateTotalPrice(1);
    
    if (modal) modal.classList.add('active');
}

// Calculation logic helper
function updateTotalPrice(quantity) {
    const total = currentBasePrice * quantity;
    if (totalPriceInput) totalPriceInput.value = `$${total}`;
    if (priceDisplay) priceDisplay.innerText = `Total Price: $${total}`;
}

// Listen to changes on the quantity selector input box
if (quantityInput) {
    quantityInput.addEventListener('input', (e) => {
        const qty = parseInt(e.target.value) || 1;
        updateTotalPrice(qty);
    });
}

// Cleanup functions
function resetFormAndKey() {
    if (orderForm) orderForm.reset();
    setWeb3FormsKey();
    if (priceDisplay) priceDisplay.innerText = '';
}

const closeModalBtn = document.getElementById('closeModal');
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        resetFormAndKey();
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        resetFormAndKey();
    }
});

// Initial Setup
setWeb3FormsKey();

// 4. Web3Forms Submission Handlers remain unchanged...
if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        if (submitBtn) {
            submitBtn.innerText = "Processing Order...";
            submitBtn.disabled = true;
        }

        const formData = new FormData(orderForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            if (response.status == 200) {
                alert("Success! Your order request has been received via email.");
            } else {
                let res = await response.json();
                alert("Error: " + res.message);
            }
        })
        .catch(error => {
            alert("Something went wrong with the form submission.");
        })
        .then(() => {
            if (submitBtn) {
                submitBtn.innerText = "Confirm Order";
                submitBtn.disabled = false;
            }
            if (modal) modal.classList.remove('active');
            resetFormAndKey();
        });
    });
}