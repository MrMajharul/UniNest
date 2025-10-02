// DOM Elements
const projectDurationEl = document.getElementById('projectDuration');
const featuresBuiltEl = document.getElementById('featuresBuilt');
const issuesResolvedEl = document.getElementById('issuesResolved');
const logoImg = document.getElementById('uniNestLogo');

// Project Statistics Data
const projectStats = {
    duration: 90,
    features: 15,
    issues: 28
};

// Counter Animation Function
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Initialize counters when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load the actual logo
    loadUniNestLogo();
    
    // Animate project statistics
    setTimeout(() => {
        animateCounter(projectDurationEl, projectStats.duration);
        animateCounter(featuresBuiltEl, projectStats.features);
        animateCounter(issuesResolvedEl, projectStats.issues);
    }, 500);
    
    // Initialize smooth scrolling for navigation
    initSmoothScrolling();
    
    // Initialize interactive features
    initInteractiveFeatures();
    
    // Initialize challenge severity indicators
    initChallengeInteractions();
    
    // Initialize progress tracking
    initProgressTracking();
});

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add active state to clicked nav item
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// Interactive Features
function initInteractiveFeatures() {
    // Add hover effects to goal items
    const goalItems = document.querySelectorAll('.goal-item');
    goalItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to solution cards
    const solutionCards = document.querySelectorAll('.solution-card');
    solutionCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 200);
        });
    });
}

// Challenge Interactions
function initChallengeInteractions() {
    const challengeItems = document.querySelectorAll('.challenge-item');
    
    challengeItems.forEach(item => {
        // Add click to expand functionality
        item.addEventListener('click', function() {
            const isExpanded = this.classList.contains('expanded');
            
            // Close all other expanded items
            challengeItems.forEach(i => i.classList.remove('expanded'));
            
            if (!isExpanded) {
                this.classList.add('expanded');
                
                // Add detailed information for expanded state
                if (!this.querySelector('.challenge-details')) {
                    const details = document.createElement('div');
                    details.className = 'challenge-details';
                    details.innerHTML = `
                        <div class="challenge-metrics">
                            <div class="metric">
                                <span class="metric-label">Time Lost:</span>
                                <span class="metric-value">${Math.floor(Math.random() * 20) + 5} hours</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Resolution Status:</span>
                                <span class="metric-value">Resolved</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Lessons Learned:</span>
                                <span class="metric-value">Process Improved</span>
                            </div>
                        </div>
                    `;
                    this.appendChild(details);
                }
            }
        });
        
        // Add severity-based color coding
        const severity = item.querySelector('.severity');
        if (severity) {
            item.addEventListener('mouseenter', function() {
                const severityClass = severity.classList.contains('high') ? 'high' : 
                                   severity.classList.contains('medium') ? 'medium' : 'low';
                this.style.borderLeftColor = severityClass === 'high' ? '#e74c3c' : 
                                           severityClass === 'medium' ? '#f39c12' : '#27ae60';
                this.style.borderLeftWidth = '6px';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.borderLeftColor = '#e74c3c';
                this.style.borderLeftWidth = '4px';
            });
        }
    });
}

// Progress Tracking
function initProgressTracking() {
    // Track scroll progress
    window.addEventListener('scroll', function() {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        // Update progress indicator if exists
        let progressBar = document.querySelector('.progress-bar');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: ${scrolled}%;
                height: 4px;
                background: linear-gradient(90deg, #3498db, #2ecc71);
                z-index: 1000;
                transition: width 0.3s ease;
            `;
            document.body.appendChild(progressBar);
        } else {
            progressBar.style.width = scrolled + '%';
        }
        
        // Highlight current section in navigation
        highlightCurrentSection();
    });
}

// Highlight current section in navigation
function highlightCurrentSection() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Utility Functions
function createTimelineAnimation() {
    const steps = document.querySelectorAll('.step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.1 });
    
    steps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-50px)';
        step.style.transition = `all 0.6s ease ${index * 0.2}s`;
        observer.observe(step);
    });
}

// Initialize timeline animation when DOM is loaded
document.addEventListener('DOMContentLoaded', createTimelineAnimation);

// Add some interactive features for better user experience
document.addEventListener('DOMContentLoaded', function() {
    // Add click-to-copy functionality for project statistics
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        stat.addEventListener('click', function() {
            const statText = `${this.querySelector('.stat-label').textContent}: ${this.querySelector('.stat-number').textContent}`;
            
            // Show feedback
            const feedback = document.createElement('div');
            feedback.textContent = 'Copied!';
            feedback.style.cssText = `
                position: absolute;
                top: -30px;
                left: 50%;
                transform: translateX(-50%);
                background: #2ecc71;
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 12px;
                z-index: 1000;
            `;
            
            this.style.position = 'relative';
            this.appendChild(feedback);
            
            setTimeout(() => {
                feedback.remove();
            }, 1500);
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const sections = document.querySelectorAll('.section');
            const currentSectionIndex = getCurrentSectionIndex(sections);
            
            let nextIndex;
            if (e.key === 'ArrowDown') {
                nextIndex = (currentSectionIndex + 1) % sections.length;
            } else {
                nextIndex = (currentSectionIndex - 1 + sections.length) % sections.length;
            }
            
            sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
        }
    });
});

function getCurrentSectionIndex(sections) {
    for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top >= -100 && rect.top <= 100) {
            return i;
        }
    }
    return 0;
}

// Add CSS for expanded challenge items
const expandedStyles = `
.challenge-item.expanded {
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    border-left-color: #3498db;
    border-left-width: 6px;
    box-shadow: 0 8px 25px rgba(52, 152, 219, 0.15);
}

.challenge-details {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e9ecef;
    opacity: 0;
    animation: fadeIn 0.3s ease forwards;
}

.challenge-metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
}

.metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    background: rgba(52, 152, 219, 0.1);
    border-radius: 8px;
}

.metric-label {
    font-size: 0.8rem;
    color: #666;
    margin-bottom: 0.3rem;
}

.metric-value {
    font-weight: 600;
    color: #2c3e50;
}

.solution-card.clicked {
    transform: scale(0.98);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.nav-link.active {
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

@keyframes fadeIn {
    to {
        opacity: 1;
    }
}
`;

// Add the styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = expandedStyles;
document.head.appendChild(styleSheet);

// Load UniNest Logo
function loadUniNestLogo() {
    // Create a canvas to convert the logo image to base64
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Create an image element for the logo
    const img = new Image();
    
    // Set up the logo with a fallback SVG version
    const logoSVG = `
        <svg width="80" height="80" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#2ecc71;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#27ae60;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#16a085;stop-opacity:1" />
                </linearGradient>
            </defs>
            
            <!-- Circular background -->
            <circle cx="100" cy="100" r="95" fill="url(#gradient1)" stroke="#ffffff" stroke-width="3"/>
            
            <!-- UN letters -->
            <text x="100" y="80" font-family="Arial, sans-serif" font-size="36" font-weight="bold" 
                  text-anchor="middle" fill="#ffffff">UN</text>
            
            <!-- University icons -->
            <g transform="translate(100, 120)">
                <!-- Book icon -->
                <rect x="-25" y="-8" width="15" height="12" rx="1" fill="#ffffff" opacity="0.9"/>
                <line x1="-22" y1="-5" x2="-22" y2="1" stroke="#27ae60" stroke-width="1"/>
                <line x1="-18" y1="-5" x2="-18" y2="1" stroke="#27ae60" stroke-width="1"/>
                
                <!-- Graduation cap -->
                <polygon points="0,-8 15,-5 15,-2 0,1 -15,-2 -15,-5" fill="#ffffff" opacity="0.9"/>
                <rect x="-1" y="-8" width="2" height="8" fill="#ffffff"/>
                <circle cx="1" cy="-8" r="2" fill="#f39c12"/>
                
                <!-- Wi-Fi signal -->
                <path d="M 5 -5 Q 12 -8 19 -5" stroke="#ffffff" stroke-width="2" fill="none" opacity="0.8"/>
                <path d="M 7 -3 Q 12 -5 17 -3" stroke="#ffffff" stroke-width="2" fill="none" opacity="0.6"/>
                <circle cx="12" cy="-1" r="1" fill="#ffffff"/>
            </g>
            
            <!-- Decorative elements -->
            <circle cx="160" cy="60" r="3" fill="#ffffff" opacity="0.6"/>
            <circle cx="40" cy="140" r="2" fill="#ffffff" opacity="0.7"/>
            <circle cx="170" cy="150" r="2.5" fill="#ffffff" opacity="0.5"/>
        </svg>
    `;
    
    // Convert SVG to data URL
    const svgBlob = new Blob([logoSVG], {type: 'image/svg+xml'});
    const url = URL.createObjectURL(svgBlob);
    
    if (logoImg) {
        logoImg.src = url;
        logoImg.alt = "UniNest - University Solutions Platform";
        
        // Add animation on load
        logoImg.onload = function() {
            this.style.opacity = '0';
            this.style.transform = 'scale(0.5)';
            
            setTimeout(() => {
                this.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            }, 200);
            
            URL.revokeObjectURL(url);
        };
    }
}

// Add logo click interaction
document.addEventListener('DOMContentLoaded', function() {
    const logoImg = document.getElementById('uniNestLogo');
    if (logoImg) {
        logoImg.addEventListener('click', function() {
            // Add a fun animation on click
            this.style.transform = 'scale(0.9) rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    }
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        animateCounter,
        initSmoothScrolling,
        initInteractiveFeatures,
        initChallengeInteractions,
        initProgressTracking,
        loadUniNestLogo
    };
}