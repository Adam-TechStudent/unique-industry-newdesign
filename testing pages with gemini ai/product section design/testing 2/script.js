// REPLACE THIS STRING WITH YOUR GENUINE WEB3FORMS ACCESS KEY
const WEB3FORMS_ACCESS_KEY = "778c1719-8969-4d35-91cd-17a827c8a9a2";

function setWeb3FormsKey() {
    const keyInput = document.getElementById('web3FormsKey');
    if (keyInput) keyInput.value = WEB3FORMS_ACCESS_KEY;
}

// Global state variables to keep track of the currently selected item's price
let currentBasePrice = 0;

// Sample dataset with 9 items spanning your requested categories
const products = [
    { id: 1, name: "Summer Linen Shirt", price: "$49.99", category: "linen" },
    { id: 2, name: "Classic Cotton Tee", price: "$24.99", category: "cotton" },
    { id: 3, name: "Cozy Wool Sweater", price: "$89.99", category: "wool" },
    { id: 4, name: "Elegant Silk Scarf", price: "$39.99", category: "silk" },
    { id: 5, name: "Slim Fit Denim Jeans", price: "$59.99", category: "denim" },
    { id: 6, name: "Formal Khaki Trouser", price: "$45.00", category: "trouser" },
    { id: 7, name: "Linen Blend Trousers", price: "$54.99", category: "linen" },
    { id: 8, name: "Premium Cotton Hoodie", price: "$64.99", category: "cotton" },
    { id: 9, name: "Denim Jacket", price: "$79.99", category: "denim" },
    { id: 10, name: "Summer Linen Shirt", price: "$49.99", category: "linen" },
    { id: 11, name: "Classic Cotton Tee", price: "$24.99", category: "cotton" },
    { id: 12, name: "Cozy Wool Sweater", price: "$89.99", category: "wool" },
    { id: 13, name: "Elegant Silk Scarf", price: "$39.99", category: "silk" },
    { id: 14, name: "Slim Fit Denim Jeans", price: "$59.99", category: "denim" },
    { id: 15, name: "Formal Khaki Trouser", price: "$45.00", category: "trouser" },
    { id: 16, name: "Linen Blend Trousers", price: "$54.99", category: "linen" },
    { id: 17, name: "Premium Cotton Hoodie", price: "$64.99", category: "cotton" },
    { id: 18, name: "Denim Jacket", price: "$79.99", category: "denim" },
    { id: 19, name: "Premium Cotton Hoodie", price: "$64.99", category: "cotton" },
    { id: 20, name: "Denim Jacket", price: "$79.99", category: "denim" },
    { id: 21, name: "Summer Linen Shirt", price: "$49.99", category: "linen" },
    { id: 22, name: "Classic Cotton Tee", price: "$24.99", category: "cotton" },
    { id: 23, name: "Cozy Wool Sweater", price: "$89.99", category: "wool" },
    { id: 24, name: "Elegant Silk Scarf", price: "$39.99", category: "silk" },
    { id: 25, name: "Slim Fit Denim Jeans", price: "$59.99", category: "denim" },
    { id: 26, name: "Formal Khaki Trouser", price: "$45.00", category: "trouser" },
    { id: 27, name: "Linen Blend Trousers", price: "$54.99", category: "linen" },
    { id: 28, name: "Premium Cotton Hoodie", price: "$64.99", category: "cotton" },
    { id: 29, name: "Denim Jacket", price: "$79.99", category: "denim" },
    { id: 30, name: "Summer Linen Shirt", price: "$49.99", category: "linen" },
    { id: 31, name: "Classic Cotton Tee", price: "$24.99", category: "cotton" },
    { id: 32, name: "Cozy Wool Sweater", price: "$89.99", category: "wool" },
    { id: 33, name: "Elegant Silk Scarf", price: "$39.99", category: "silk" },
    { id: 34, name: "Slim Fit Denim Jeans", price: "$59.99", category: "denim" },
    { id: 35, name: "Formal Khaki Trouser", price: "$45.00", category: "trouser" },
    { id: 36, name: "Linen Blend Trousers", price: "$54.99", category: "linen" },
    { id: 37, name: "Premium Cotton Hoodie", price: "$64.99", category: "cotton" },
    { id: 38, name: "Denim Jacket", price: "$79.99", category: "denim" },
    { id: 39, name: "Premium Cotton Hoodie", price: "$64.99", category: "cotton" },
    { id: 40, name: "Denim Jacket", price: "$79.99", category: "denim" }
];

const container = document.getElementById('products-container');
const title = document.getElementById('category-title');

// Function to render cards dynamically
function renderProducts(filteredList) {
    container.innerHTML = ""; // Clear existing cards

    filteredList.forEach(product => {
        // FIX: Extract numeric value from "$49.99" -> 49.99
        const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, ''));

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
                    <div class="card-img-placeholder">${product.category}</div>
                    <h3>${product.name}</h3>
                    <div class="price">${product.price}</div>
                    <button class="order-btn" onclick="openOrderModal('${product.name.replace(/'/g, "\\'")}', ${numericPrice})">Order Now</button>
                `;
        container.appendChild(card);
    });
}

// Function to filter categories when sidebar button is clicked
function filterCategory(category, buttonElement) {
    // Update Active Class on Sidebar buttons
    const buttons = document.querySelectorAll('.menu-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    buttonElement.classList.add('active');

    // Update Title Text
    title.textContent = category === 'all' ? 'All Products' : category;

    // Filter data logic
    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
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
    const total = (currentBasePrice * quantity).toFixed(2); // Formats to 2 decimal places
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

// 4. Web3Forms Submission Handlers
if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
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

// Initial Load to show all products on startup
renderProducts(products);