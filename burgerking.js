// BurgerKing Website JavaScript

let cart = [];
const menuItems = [
    { name: "Whopper®", price: 8.99 },
    { name: "Double Whopper®", price: 10.99 },
    { name: "Whopper Jr.®", price: 5.99 },
    { name: "Bacon King®", price: 9.99 },
    { name: "Double Cheeseburger", price: 8.49 },
    { name: "Crispy Chicken Sandwich", price: 6.99 }
];

// Update cart counter in navbar
function updateCartCounter() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const counterElement = document.getElementById('cart-count');
    if (counterElement) {
        counterElement.textContent = count;
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add to Cart function
function addToCart(itemName, price) {
    const cartItem = {
        name: itemName,
        price: price,
        quantity: 1,
        id: Date.now()
    };

    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(cartItem);
    }

    // Show notification
    showNotification(`✓ ${itemName} added to cart!`, 'success');
    updateCartCounter();
    saveCart();
}

// Show notification with enhanced styling
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? '#ff6b35' : type === 'error' ? '#dc3545' : '#007bff';
    
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, ${bgColor}, ${bgColor}dd);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        font-weight: 500;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Filter and search functionality
function filterMenu() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const priceFilter = document.getElementById('priceFilter')?.value || '';
    
    const menuGrid = document.getElementById('menuGrid');
    const items = menuGrid.querySelectorAll('.menu-item');
    
    items.forEach(item => {
        const itemName = item.querySelector('h3')?.textContent.toLowerCase() || '';
        const itemPrice = parseFloat(item.querySelector('.price')?.textContent.replace('$', '') || 0);
        
        let matchesSearch = itemName.includes(searchTerm) || searchTerm === '';
        let matchesPrice = true;
        
        if (priceFilter === 'low') matchesPrice = itemPrice < 10;
        else if (priceFilter === 'medium') matchesPrice = itemPrice >= 10 && itemPrice <= 15;
        else if (priceFilter === 'high') matchesPrice = itemPrice > 15;
        
        item.style.display = matchesSearch && matchesPrice ? 'block' : 'none';
        item.style.animation = matchesSearch && matchesPrice ? 'fadeInUp 0.3s ease-out' : 'none';
    });
}

function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('priceFilter').value = '';
    filterMenu();
}

// Setup filter event listeners
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const priceFilter = document.getElementById('priceFilter');
    
    if (searchInput) searchInput.addEventListener('input', filterMenu);
    if (priceFilter) priceFilter.addEventListener('change', filterMenu);
});

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('burgerking_cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('burgerking_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCounter();
    }
}

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        
        // Validate form
        const name = formData.get('name') || document.querySelector('input[placeholder="Your Name"]').value;
        const email = formData.get('email') || document.querySelector('input[placeholder="Your Email"]').value;
        const message = formData.get('message') || document.querySelector('textarea').value;

        if (name && email && message) {
            showNotification('✓ Message sent successfully! We will get back to you soon.', 'success');
            this.reset();
        } else {
            showNotification('⚠ Please fill in all fields.', 'error');
        }
    });
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize cart on page load
loadCart();

// Test console message
console.log('BurgerKing website loaded successfully!');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize cart on page load
loadCart();

// Test console message
console.log('BurgerKing website loaded successfully!');
