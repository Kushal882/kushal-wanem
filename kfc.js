// KFC Website JavaScript

let cart = [];

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
    showNotification(`${itemName} added to cart!`);
    saveCart();
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #e4002b;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('kfc_cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('kfc_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
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
            showNotification('Message sent successfully! We will get back to you soon.');
            this.reset();
        } else {
            showNotification('Please fill in all fields.');
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
`;
document.head.appendChild(style);

// Initialize cart on page load
loadCart();

// Test console message
console.log('KFC website loaded successfully!');
