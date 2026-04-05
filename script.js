// ===================================
// Navigation Functionality
// ===================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');

function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===================================
// Typing Animation
// ===================================
const typedTextSpan = document.querySelector('.typed-text');
const cursor = document.querySelector('.cursor');

const textArray = [
    'Frontend Engineer',
    'React.js Developer',
    'UI/UX Enthusiast',
    'Problem Solver'
];

const typingDelay = 80;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) {
            textArrayIndex = 0;
        }
        setTimeout(type, typingDelay + 500);
    }
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }
});

// ===================================
// Smooth Scrolling
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Contact Form
// ===================================
const scriptURL = 'https://script.google.com/macros/s/AKfycbxu2ooee5_mWObZANMV05Im6ax7toD_FSEpaEWQ63YSvpdIo-NG24QFFjmy_AnEe6KuEg/exec';
const form = document.forms['submit-to-google-sheet'];
const formMessage = document.getElementById('formMessage');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        fetch(scriptURL, { 
            method: 'POST', 
            body: new FormData(form) 
        })
        .then(response => {
            formMessage.innerHTML = '✓ Message sent successfully! I\'ll get back to you soon.';
            formMessage.style.color = '#00ff88';
            form.reset();
            
            setTimeout(() => {
                formMessage.innerHTML = '';
            }, 5000);
        })
        .catch(error => {
            formMessage.innerHTML = '✗ Oops! Something went wrong. Please try again.';
            formMessage.style.color = '#ff5f56';
            console.error('Error:', error);
        })
        .finally(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        });
    });
}

// ===================================
// Scroll Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.timeline-item, .stat-card, .skill-category, .project-card, .info-card, .highlight-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// ===================================
// Parallax Effect for Background Orbs
// ===================================
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===================================
// Number Counter Animation
// ===================================
function animateValue(element, start, end, duration, suffix = '') {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + suffix;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// Trigger counter animation when stats are in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const value = stat.textContent;
                const numericValue = parseFloat(value);
                const suffix = value.includes('+') ? '+' : value.includes('%') ? '%' : '';
                const duration = 2000;
                
                animateValue(stat, 0, numericValue, duration, suffix);
            });
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {
        statsObserver.observe(aboutStats);
    }
});

// ===================================
// Cursor Trail Effect (Optional)
// ===================================
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

if (circles.length > 0) {
    circles.forEach(function (circle) {
        circle.x = 0;
        circle.y = 0;
    });

    window.addEventListener('mousemove', function(e) {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;
        
        circles.forEach(function (circle, index) {
            circle.style.left = x - 12 + 'px';
            circle.style.top = y - 12 + 'px';
            circle.style.scale = (circles.length - index) / circles.length;
            
            circle.x = x;
            circle.y = y;

            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });
    
        requestAnimationFrame(animateCircles);
    }

    animateCircles();
}

// ===================================
// Keyboard Navigation
// ===================================
document.addEventListener('keydown', (e) => {
    // Navigate sections with arrow keys
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const currentSection = Array.from(sections).find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top >= 0 && rect.top < window.innerHeight / 2;
        });
        
        if (currentSection) {
            const currentIndex = Array.from(sections).indexOf(currentSection);
            let targetIndex = e.key === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1;
            
            if (targetIndex >= 0 && targetIndex < sections.length) {
                sections[targetIndex].scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

// ===================================
// Performance Optimizations
// ===================================
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
const debouncedScroll = debounce(() => {
    updateActiveLink();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===================================
// Console Easter Egg
// ===================================
console.log(
    '%c👋 Hey there, curious developer!',
    'color: #00f0ff; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,240,255,0.3);'
);
console.log(
    '%cLike what you see? Let\'s build something amazing together!',
    'color: #7b61ff; font-size: 14px;'
);
console.log(
    '%c📧 Email: tkumar9587@gmail.com',
    'color: #b4b4c8; font-size: 12px;'
);

// ===================================
// Page Load Animation
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Prevent FOUC (Flash of Unstyled Content)
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.visibility = 'visible';
});
