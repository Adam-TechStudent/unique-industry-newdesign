// REPLACE THIS STRING WITH YOUR GENUINE WEB3FORMS ACCESS KEY
const WEB3FORMS_ACCESS_KEY = "778c1719-8969-4d35-91cd-17a827c8a9a2"; 

// Update key inside the hidden form input right away
document.getElementById('web3FormsKey').value = WEB3FORMS_ACCESS_KEY;

// 1. Data Object for 9 Textile Items
const products = [
    { id: 1, name: "Premium Egyptian Cotton", desc: "100% Organic, 600 Thread Count", img: "https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Pure Mulberry Silk", desc: "Luxurious, smooth 22 Momme silk", img: "https://images.unsplash.com/photo-1584143944369-a10ce17d4407?auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Belgian Linen", desc: "Breathable, pre-washed flax linen", img: "https://images.unsplash.com/photo-1606744838346-7b47f0cf0564?auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "Merino Wool Blend", desc: "Soft, thermal regulation wool", img: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=500&q=80" },
    { id: 5, name: "Raw Denim Twill", desc: "Heavyweight 14oz selvedge cotton", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=80" },
    { id: 6, name: "Jacquard Brocade", desc: "Intricate metallic floral weaves", img: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=500&q=80" },
    { id: 7, name: "Stretch Corduroy", desc: "Vintage 11-wale soft ribbed fabric", img: "https://images.unsplash.com/photo-1582719471384-894fbb16e024?auto=format&fit=crop&w=500&q=80" },
    { id: 8, name: "Breathable Bamboo Viscose", desc: "Eco-friendly, moisture-wicking jersey", img: "https://images.unsplash.com/photo-1528255671579-01b9e182ed1d?auto=format&fit=crop&w=500&q=80" },
    { id: 9, name: "Hearth Canvas", desc: "Ultra-durable upholstery grade fabric", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=80" }
];

// 2. Loop to build the UI Grid
const grid = document.getElementById('productGrid');
products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="image-container">
            <img src="${product.img}" alt="${product.name}" class="product-img">
            <div class="image-overlay">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
            </div>
        </div>
        <div class="card-body">
            <button class="order-btn" onclick="openOrderModal('${product.name}')">Order Now</button>
        </div>
    `;
    grid.appendChild(card);
});

// 3. Modal Controllers
const modal = document.getElementById('orderModal');
const productNameInput = document.getElementById('productName');
const emailSubjectInput = document.getElementById('emailSubject');
const orderForm = document.getElementById('orderForm');
const submitBtn = document.getElementById('submitBtn');

function openOrderModal(name) {
    productNameInput.value = name;
    // Sets the custom dynamic email subject subject line received in your inbox
    emailSubjectInput.value = `New Textile Order Request: ${name}`;
    modal.classList.add('active');
}

document.getElementById('closeModal').addEventListener('click', () => {
    modal.classList.remove('active');
    orderForm.reset();
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        orderForm.reset();
    }
});

// 4. Web3Forms AJAX Form Processing API
orderForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Stop standard redirect behavior

    submitBtn.innerText = "Processing Order...";
    submitBtn.disabled = true;

    const formData = new FormData(orderForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    // POST execution to Web3Forms endpoint
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let res = await response.json();
        if (response.status == 200) {
            alert("Success! Your order request has been received via email.");
        } else {
            console.log(response);
            alert("Error: " + res.message);
        }
    })
    .catch(error => {
        console.log(error);
        alert("Something went wrong with the form submission.");
    })
    .then(() => {
        // Reset UI settings afterward
        submitBtn.innerText = "Confirm Order";
        submitBtn.disabled = false;
        modal.classList.remove('active');
        orderForm.reset();
    });
});