// 1. Premium Fluid Interactive Follow Cursor
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    // Dynamic alignment tracking
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Expansion of tracking node when hovering interactive assets
const interactives = document.querySelectorAll('a, .fabric-selector, .burger-menu');
interactives.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
    });
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
    });
});

// 2. High-Fidelity Material Vault Vault Matrix Switcher
const selectors = document.querySelectorAll('.fabric-selector');
const displayTarget = document.getElementById('canvas-dynamic-target');

selectors.forEach(selector => {
    selector.addEventListener('mouseenter', function() {
        // Clear old states
        selectors.forEach(s => s.classList.remove('active'));
        
        // Target dynamic image properties
        this.classList.add('active');
        const targetImageSrc = this.getAttribute('data-img');
        
        // Execute premium blend crossfade transition through DOM manipulation
        displayTarget.style.opacity = '0.3';
        displayTarget.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            displayTarget.setAttribute('src', targetImageSrc);
            displayTarget.style.opacity = '1';
            displayTarget.style.transform = 'scale(1)';
        }, 250);
    });
});

// 3. Parallax Shift Engine for Right Hero Canvas on Mouse Movement
const heroRightPanel = document.querySelector('.hero-right-panel');
if (window.innerWidth > 968) {
    heroRightPanel.addEventListener('mousemove', (e) => {
        const primaryImg = document.querySelector('.img-primary');
        const secondaryImg = document.querySelector('.img-secondary');
        
        const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 45;
        
        primaryImg.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
        secondaryImg.style.transform = `translate(${-xAxis * 1.5}px, ${-yAxis * 1.5}px)`;
    });
    
    heroRightPanel.addEventListener('mouseleave', () => {
        const primaryImg = document.querySelector('.img-primary');
        const secondaryImg = document.querySelector('.img-secondary');
        primaryImg.style.transform = 'translate(0px, 0px)';
        secondaryImg.style.transform = 'translate(0px, 0px)';
    });
}