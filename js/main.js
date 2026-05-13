/**
 * Markexis - SEO Portfolio Website
 * Main JavaScript File
 */

// ==========================================
// Mobile Menu Toggle
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
});

// ==========================================
// Scroll to Top Button
// ==========================================
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// Smooth Scroll for Anchor Links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#" or empty
        if (href === '#' || href === '') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 100;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// Navbar Background on Scroll
// ==========================================
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.style.background = 'rgba(10, 14, 26, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 14, 26, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// ==========================================
// Contact Form Handling
// ==========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            website: document.getElementById('website').value,
            business: document.getElementById('business').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value,
            budget: document.getElementById('budget').value,
            newsletter: document.getElementById('newsletter').checked
        };
        
        // Basic validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.website || 
            !formData.business || !formData.service || !formData.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(function() {
            console.log('Form Data:', formData);
            
            // Show success message
            showFormMessage('Thank you for reaching out! I will get back to you within 24 hours.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
            
            // In production, you would send this data to your backend API
            // Example:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     showFormMessage('Thank you! Your message has been sent.', 'success');
            //     contactForm.reset();
            // })
            // .catch(error => {
            //     showFormMessage('Something went wrong. Please try again.', 'error');
            // })
            // .finally(() => {
            //     submitButton.innerHTML = originalButtonText;
            //     submitButton.disabled = false;
            // });
        }, 1500);
    });
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide message after 5 seconds for errors, 10 seconds for success
        const timeout = type === 'error' ? 5000 : 10000;
        setTimeout(function() {
            formMessage.style.display = 'none';
        }, timeout);
    }
}

// ==========================================
// Fade-in Animation on Scroll
// ==========================================
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.service-card, .result-card, .strength-card, .testimonial-card, .portfolio-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize fade-in animation
if (window.innerWidth > 768) {
    fadeInOnScroll();
}

// ==========================================
// Counter Animation for Stats
// ==========================================
function animateCounters() {
    const counters = document.querySelectorAll('.badge-number, .stat-number, .trust-number');
    
    counters.forEach(counter => {
        const target = counter.textContent.trim();
        
        // Only animate if it's a pure number
        if (!isNaN(parseInt(target))) {
            const animate = () => {
                const value = parseInt(target);
                const duration = 2000; // 2 seconds
                const steps = 60;
                const increment = value / steps;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= value) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, duration / steps);
            };
            
            // Animate when element comes into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animate();
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5
            });
            
            observer.observe(counter);
        }
    });
}

// Initialize counter animation
animateCounters();

// ==========================================
// Active Navigation Link Highlighting
// ==========================================
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        
        // Remove active class from all links
        link.classList.remove('active');
        
        // Add active class to current page link
        if (linkPath === currentPath || 
            (currentPath === '/' && linkPath.includes('index.html')) ||
            (currentPath.includes(linkPath.replace('.html', '')) && linkPath !== '/')) {
            link.classList.add('active');
        }
    });
}

// Set active nav link on page load
setActiveNavLink();

// ==========================================
// Lazy Loading for Images (if any added later)
// ==========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// Add Loading State to External Links
// ==========================================
document.querySelectorAll('a[href^="http"]').forEach(link => {
    // Skip if it's linking to the same domain
    if (link.hostname === window.location.hostname) return;
    
    // Add external link indicator
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
});

// ==========================================
// Form Input Enhancement
// ==========================================
const formInputs = document.querySelectorAll('input, textarea, select');

formInputs.forEach(input => {
    // Add floating label effect
    if (input.value) {
        input.parentElement.classList.add('has-value');
    }
    
    input.addEventListener('input', function() {
        if (this.value) {
            this.parentElement.classList.add('has-value');
        } else {
            this.parentElement.classList.remove('has-value');
        }
    });
    
    // Add focus styling
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('is-focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('is-focused');
    });
});

// ==========================================
// Prevent Form Resubmission on Refresh
// ==========================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ==========================================
// Add Year to Copyright
// ==========================================
const currentYear = new Date().getFullYear();
const copyrightElements = document.querySelectorAll('.footer-bottom p');

copyrightElements.forEach(element => {
    if (element.textContent.includes('2025')) {
        element.textContent = element.textContent.replace('2025', currentYear);
    }
});

// ==========================================
// Performance: Debounce Scroll Events
// ==========================================
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(function() {
    // Scroll-dependent functions here are already optimized above
}, 10));

// ==========================================
// Print Current Page Info (for debugging)
// ==========================================
console.log('%c🚀 Markexis Portfolio Website', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%cDeveloped for: Rakibur Rahman (SEO Specialist)', 'color: #8b5cf6; font-size: 14px;');
console.log('%cSpecializing in: Geo-Targeted & Answer Engine Optimization', 'color: #10b981; font-size: 12px;');

// ==========================================
// Accessibility: Skip to Main Content
// ==========================================
document.addEventListener('keydown', function(e) {
    // Alt + M to skip to main content
    if (e.altKey && e.key === 'm') {
        const mainContent = document.querySelector('main') || document.querySelector('.hero');
        if (mainContent) {
            mainContent.scrollIntoView({ behavior: 'smooth' });
            mainContent.focus();
        }
    }
});

// ==========================================
// Service Worker Registration (Optional - for PWA)
// ==========================================
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
*/

// ==========================================
// End of Main JavaScript
// ==========================================
