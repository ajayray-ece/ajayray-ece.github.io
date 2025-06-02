// Typing Animation
const typedTextSpan = document.querySelector('.typed-text');
const texts = ['Web Developer', 'UI/UX Designer', 'Freelancer', 'Problem Solver', 'VLSI Engineer','Robotics Enthusiast','Top 5% in Department'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;
let erasingDelay = 100;
let newTextDelay = 2000;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = erasingDelay;
    } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 200 - Math.random() * 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingDelay = newTextDelay;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingDelay = 500;
    }

    setTimeout(type, typingDelay);
}

// Loader
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 500);
    }
});

// Start typing animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const typedTextSpan = document.querySelector('.typed-text');
    if(typedTextSpan) type();
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

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
            // Close mobile menu after clicking
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Animate elements on scroll
const animateOnScroll = (elements, className) => {
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (elementPosition < screenPosition) {
            element.classList.add(className);
        }
    });
};

// Animate progress bars
const progressBars = document.querySelectorAll('.progress');
window.addEventListener('scroll', () => {
    animateOnScroll(progressBars, 'animate-progress');
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        console.log('Form submitted:', data);
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        if (document.body.getAttribute('data-theme') === 'dark') {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    } else {
        navbar.classList.remove('scrolled');
        if (document.body.getAttribute('data-theme') === 'dark') {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Theme Toggle
const themeToggle = document.getElementById('toggle_checkbox');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
} else if (currentTheme === 'light') {
    document.body.setAttribute('data-theme', 'light');
    themeToggle.checked = false;
} else if (prefersDarkScheme.matches) {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
}

// Handle theme toggle
themeToggle.addEventListener('change', function() {
    const isDark = this.checked;
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Update navbar on scroll
window.addEventListener('scroll', () => {
    updateNavbarTheme(document.body.getAttribute('data-theme') === 'dark');
});

// Add animation to project cards on scroll
const projectCards = document.querySelectorAll('.project-card');

const animateProjectCards = () => {
    projectCards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (cardPosition < screenPosition) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
};

// Initialize project cards
projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
});

window.addEventListener('scroll', animateProjectCards);

// Animate education cards on scroll
const educationCards = document.querySelectorAll('.education-card');
const animateEducationCards = () => {
    educationCards.forEach((card, index) => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (cardPosition < screenPosition - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
};

// Initialize education cards
educationCards.forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
});

window.addEventListener('scroll', animateEducationCards);
// Trigger initial animation if cards are in view
animateEducationCards();

// Skills Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');

        // Animate progress bars in active tab
        const activeTab = document.getElementById(btn.dataset.tab);
        const skillCards = activeTab.querySelectorAll('.skill-card');
        skillCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate');
            }, index * 200);
        });
    });
});

// Animate skill cards when they come into view
const observeSkills = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillCards = entry.target.querySelectorAll('.skill-card');
                skillCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate');
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.tab-content').forEach(tab => {
        observer.observe(tab);
    });
};

// Active nav link on scroll
const sections = document.querySelectorAll('section');

const observeSections = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href').slice(1) === entry.target.id) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => {
        observer.observe(section);
    });
};

// Initialize observers
observeSkills();
observeSections();

// Custom Cursor
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .education-card, .skill-card, .social-links a');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// Animate coding profile cards
const profileCards = document.querySelectorAll('.profile-card');
const animateProfileCards = () => {
    profileCards.forEach((card, index) => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (cardPosition < screenPosition - 100) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
};

// Initialize profile cards
profileCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
});

window.addEventListener('scroll', animateProfileCards);
// Trigger initial animation if cards are in view
animateProfileCards();

// Section Headers Animation
const observerOptions = {
    root: null,
    rootMargin: '-50px 0px',  // Adjust when the animation triggers
    threshold: 0.2  // Trigger animation when 20% of the section is visible
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add a small delay for smoother animation
            setTimeout(() => {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }, 100);
            sectionObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Section initialization and spacing
function initializeSections() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        // Add section-content wrapper if it doesn't exist
        if (!section.querySelector('.section-content')) {
            const children = Array.from(section.children);
            const wrapper = document.createElement('div');
            wrapper.className = 'section-content';
            
            // Skip the section header when wrapping
            const header = section.querySelector('.section-header');
            children.forEach(child => {
                if (child !== header) {
                    wrapper.appendChild(child);
                }
            });
            
            if (header) {
                section.insertBefore(wrapper, header.nextSibling);
            } else {
                section.appendChild(wrapper);
            }
        }
        
        // Ensure proper spacing
        section.style.position = 'relative';
        section.style.zIndex = 1;
        
        // Add background color to create separation
        if (index % 2 === 0) {
            section.style.background = 'var(--surface-color)';
        } else {
            section.style.background = 'var(--background-color)';
        }
    });
}

// Initialize sections after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeSections();
    initializeSectionHeaders();
    
    // Observe section headers for animation
    document.querySelectorAll('.section-header').forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(30px)';
        sectionObserver.observe(header);
    });
});

// Update section visibility and spacing on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const header = section.querySelector('.section-header');
        
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            if (header && !header.classList.contains('visible')) {
                header.classList.add('visible');
            }
        }
    });
});

// Update existing observerOptions
observerOptions.rootMargin = '0px';
observerOptions.threshold = 0.05;

// Create new scroll animation observer
const sectionAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation classes to section elements
            entry.target.classList.add('animate-in');
            
            // Animate section content with delays
            const content = entry.target.querySelector('.section-content');
            const header = entry.target.querySelector('.section-header');
            
            if (header) {
                header.classList.add('animate-in');
            }
            
            if (content) {
                content.classList.add('animate-in');
                
                // Add delayed animations to children
                const children = content.children;
                Array.from(children).forEach((child, index) => {
                    child.classList.add(`animate-delay-${(index % 3) + 1}`);
                    child.classList.add('animate-in');
                });
            }
        }
    });
}, observerOptions);

// Initialize animations
function initScrollAnimations() {
    // Add animation classes to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('section-animate');
        sectionAnimationObserver.observe(section);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Trigger animation for initial visible sections
window.addEventListener('load', () => {
    document.querySelectorAll('section').forEach(section => {
        if (isElementInViewport(section)) {
            section.classList.add('animate-in');
            
            const content = section.querySelector('.section-content');
            const header = section.querySelector('.section-header');
            
            if (header) header.classList.add('animate-in');
            if (content) content.classList.add('animate-in');
        }
    });
});

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Remove all marksheet modal related functions 