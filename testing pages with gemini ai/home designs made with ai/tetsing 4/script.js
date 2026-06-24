// Dynamic Tactile Inspector Crossfade Logic
const selectionCards = document.querySelectorAll('.fiber-card');

// Dynamic Display Target Elements
const masterImg = document.getElementById('vault-master-img');
const metricWeight = document.getElementById('meta-weight');
const metricOrigin = document.getElementById('meta-origin');
const dynamicDesc = document.getElementById('meta-desc');

selectionCards.forEach(card => {
    // Listen for custom trigger click patterns on choice items
    card.addEventListener('click', function() {
        
        // Remove active class token states across row items
        selectionCards.forEach(c => c.classList.remove('active'));
        
        // Apply active context properties to current targeted item
        this.classList.add('active');
        
        // Parse raw inline structural data components
        const newImg = this.getAttribute('data-img');
        const newWeight = this.getAttribute('data-weight');
        const newOrigin = this.getAttribute('data-origin');
        const newDesc = this.getAttribute('data-desc');

        // Execute visual fade out
        masterImg.style.opacity = '0.2';
        masterImg.style.transform = 'scale(0.97)';
        
        // Inject refreshed content models systematically
        setTimeout(() => {
            masterImg.setAttribute('src', newImg);
            metricWeight.innerText = newWeight;
            metricOrigin.innerText = newOrigin;
            dynamicDesc.innerText = newDesc;
            
            // Return visual states smoothly back to focus brightness
            masterImg.style.opacity = '1';
            masterImg.style.transform = 'scale(1)';
        }, 200);
    });
});