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
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
                    <div class="card-img-placeholder">${product.category}</div>
                    <h3>${product.name}</h3>
                    <div class="price">${product.price}</div>
                    <button class="order-btn" onclick="placeOrder('${product.name}')">Order Now</button>
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

// Simple alert placeholder for Order button
function placeOrder(productName) {
    alert(`Thank you! Your order for "${productName}" has been received.`);
}

// Initial Load to show all products on startup
renderProducts(products);