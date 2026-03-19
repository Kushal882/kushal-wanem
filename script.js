// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const htmlElement = document.documentElement;

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    htmlElement.classList.add('dark-mode');
    if (darkModeToggle) darkModeToggle.checked = true;
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('change', () => {
        htmlElement.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', htmlElement.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    });
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
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

// Scroll Animations - Fade in elements as they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animate-on-scroll elements
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Form Validation and Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        let errors = [];

        if (!name) {
            errors.push('Name is required');
        }

        if (!email) {
            errors.push('Email is required');
        } else if (!isValidEmail(email)) {
            errors.push('Please enter a valid email');
        }

        if (!message) {
            errors.push('Message is required');
        } else if (message.length < 10) {
            errors.push('Message must be at least 10 characters');
        }

        // Show errors or success
        const formFeedback = document.getElementById('formFeedback');
        if (errors.length > 0) {
            if (formFeedback) {
                formFeedback.innerHTML = '<div class="error-message">' + errors.join('<br>') + '</div>';
                formFeedback.style.display = 'block';
            }
        } else {
            if (formFeedback) {
                formFeedback.innerHTML = '<div class="success-message">Message sent successfully! Thank you for reaching out.</div>';
                formFeedback.style.display = 'block';
            }
            // Reset form
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                if (formFeedback) formFeedback.style.display = 'none';
            }, 5000);
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Project Modals
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const modalContent = document.querySelector('.modal-body');

projectCards.forEach(card => {
    card.addEventListener('click', function() {
        const projectTitle = this.querySelector('h3').textContent;
        const projectDesc = this.querySelector('p').textContent;
        const projectTags = Array.from(this.querySelectorAll('.tag')).map(tag => tag.textContent).join(', ');

        if (modal && modalContent) {
            modalContent.innerHTML = `
                <h2>${projectTitle}</h2>
                <p>${projectDesc}</p>
                <p><strong>Technologies:</strong> ${projectTags}</p>
                <a href="#" class="btn btn-primary">View Project</a>
            `;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
if (modalClose) {
    modalClose.addEventListener('click', () => {
        if (modal) modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
if (modal) {
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        if (navbar) navbar.classList.add('scrolled');
    } else {
        if (navbar) navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Skill progress animation
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.classList.add('animate-on-scroll');
});

// Project cards animation
const projectCardsAnim = document.querySelectorAll('.project-card');
projectCardsAnim.forEach(card => {
    card.classList.add('animate-on-scroll');
});

console.log('Portfolio interactive features loaded successfully!');
