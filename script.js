// DOM Elements
const plannedFeaturesEl = document.getElementById('plannedFeatures');
const teamMembersEl = document.getElementById('teamMembers');
const developmentPhasesEl = document.getElementById('developmentPhases');
const logoImg = document.getElementById('uniNestLogo');

// Project Statistics Data
const projectStats = {
    plannedFeatures: 8,
    teamMembers: 3,
    developmentPhases: 6
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
        animateCounter(plannedFeaturesEl, projectStats.plannedFeatures);
        animateCounter(teamMembersEl, projectStats.teamMembers);
        animateCounter(developmentPhasesEl, projectStats.developmentPhases);
    }, 500);
    
    // Initialize smooth scrolling for navigation
    initSmoothScrolling();
    
    // Initialize interactive features
    initInteractiveFeatures();
    
    // Initialize feature interactions
    initFeatureInteractions();
    
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
    
    // Add click effects to demo items
    const demoItems = document.querySelectorAll('.demo-item');
    demoItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 200);
        });
    });
    
    // Add hover effects to story cards
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Feature Interactions
function initFeatureInteractions() {
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach(item => {
        // Add click to expand functionality
        item.addEventListener('click', function() {
            const isExpanded = this.classList.contains('expanded');
            
            // Close all other expanded items
            featureItems.forEach(i => i.classList.remove('expanded'));
            
            if (!isExpanded) {
                this.classList.add('expanded');
                
                // Add detailed information for expanded state
                if (!this.querySelector('.feature-details')) {
                    const details = document.createElement('div');
                    details.className = 'feature-details';
                    details.innerHTML = `
                        <div class="feature-metrics">
                            <div class="metric">
                                <span class="metric-label">Development Time:</span>
                                <span class="metric-value">${Math.floor(Math.random() * 4) + 2} weeks</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Complexity:</span>
                                <span class="metric-value">Medium</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">User Impact:</span>
                                <span class="metric-value">High</span>
                            </div>
                        </div>
                    `;
                    this.appendChild(details);
                }
            }
        });
        
        // Add status-based color coding
        const status = item.querySelector('.status');
        if (status) {
            item.addEventListener('mouseenter', function() {
                const statusClass = status.classList.contains('priority') ? 'priority' : 
                                   status.classList.contains('planned') ? 'planned' : 'future';
                this.style.borderLeftColor = statusClass === 'priority' ? '#e74c3c' : 
                                           statusClass === 'planned' ? '#3498db' : '#95a5a6';
                this.style.borderLeftWidth = '6px';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.borderLeftColor = '#3498db';
                this.style.borderLeftWidth = '4px';
            });
        }
    });
    
    // Add team member interactions
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });
    
    // Add phase timeline interactions
    const phases = document.querySelectorAll('.phase');
    phases.forEach(phase => {
        phase.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        phase.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
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

// Add CSS for expanded feature items
const expandedStyles = `
.feature-item.expanded {
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    border-left-color: #3498db;
    border-left-width: 6px;
    box-shadow: 0 8px 25px rgba(52, 152, 219, 0.15);
}

.feature-details {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e9ecef;
    opacity: 0;
    animation: fadeIn 0.3s ease forwards;
}

.feature-metrics {
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

.demo-item.clicked {
    transform: scale(0.98);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.team-member.clicked {
    transform: scale(0.95) rotate(2deg);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
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
    const logoElement = document.querySelector('.logo-image');
    if (logoElement) {
        logoElement.style.opacity = '0';
        logoElement.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            logoElement.src = 'assets/images/logo.svg';
            logoElement.style.transition = 'all 0.5s ease';
            logoElement.style.opacity = '1';
            logoElement.style.transform = 'scale(1)';
        }, 100);
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
        initFeatureInteractions,
        initProgressTracking,
        loadUniNestLogo
    };
}