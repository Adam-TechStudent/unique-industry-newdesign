// Pure Design Objects focusing strictly on fabric parameters and aesthetic tags
const collections = [
  {
    id: 'tex-01',
    name: 'Raw Herringbone Tweed',
    sku: 'HBN-0912',
    specs: '100% Virgin Wool • Heavyweight Blend',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tex-02',
    name: 'Slubbed Belgian Linen',
    sku: 'LIN-4401',
    specs: '100% Flax • Textured Oatmeal Weave',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tex-03',
    name: 'Structured Ottoman Rib',
    sku: 'OTM-8831',
    specs: 'Cotton Silk Blend • Matte Cord Finish',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=600&q=80'
  }
];

const showcaseGrid = document.getElementById('fabric-showcase');

// Generate Cards
collections.forEach(fabric => {
  const cardElement = document.createElement('div');
  cardElement.className = 'fabric-card';

  cardElement.innerHTML = `
    <div class="image-frame">
      <img src="${fabric.image}" alt="${fabric.name}" class="fabric-image" loading="lazy">
    </div>
    
    <div class="fabric-meta-block">
      <span class="fabric-sku">Ref. ${fabric.sku}</span>
      <h3 class="fabric-name">${fabric.name}</h3>
      <p class="fabric-details">${fabric.specs}</p>
    </div>

    <div class="fabric-actions">
      <button class="btn-action secondary" onclick="handleInquiry('${fabric.name}', 'Swatch')">Order Swatch</button>
      <button class="btn-action primary" onclick="handleInquiry('${fabric.name}', 'Production')">Production Run</button>
    </div>
  `;

  showcaseGrid.appendChild(cardElement);
});

// Clean interaction logging placeholder
function handleInquiry(fabricName, type) {
  console.log(`B2B Portal: Initialized ${type} request workflow for "${fabricName}".`);
  alert(`Your ${type} request process for ${fabricName} has been initialized.`);
}