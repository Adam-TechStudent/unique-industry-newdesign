// Dynamic Material Specification Dock System
const inspectItems = document.querySelectorAll('.inspect-item');

// Metric Selectors
const specComp = document.getElementById('specComp');
const specWeight = document.getElementById('specWeight');
const specWeave = document.getElementById('specWeave');

inspectItems.forEach(item => {
    // When pointer triggers entry into material bounding grid space
    item.addEventListener('mouseenter', function() {
        const weight = this.getAttribute('data-spec-weight');
        const weave = this.getAttribute('data-spec-weave');
        const composition = this.getAttribute('data-spec-composition');
        
        // Push parsed strings straight into DOM anchors
        specComp.innerText = composition;
        specWeight.innerText = weight;
        specWeave.innerText = weave;
        
        // Give a little visual flash to show data refreshed
        const dock = document.getElementById('specDock');
        dock.style.borderColor = 'var(--accent-ochre)';
    });

    item.addEventListener('mouseleave', function() {
        // Return active context box to native balance states
        specComp.innerText = "Hover a fabric";
        specWeight.innerText = "-";
        specWeave.innerText = "-";
    });
});

// Interactive subtle fade animation logic on scroll
window.addEventListener('scroll', function() {
    const scrollLine = document.querySelector('.scroll-line');
    const scrollPosition = window.scrollY;
    
    // Scale tracking line in left sidebar as viewport drops
    if(scrollLine) {
        scrollLine.style.height = `${40 + scrollPosition * 0.15}px`;
    }
});