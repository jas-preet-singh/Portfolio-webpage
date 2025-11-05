// JavaScript for Jaspreet Singh's Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100; // Account for fixed navbar and extra spacing
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    function highlightNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('text-green-400');
            item.classList.add('text-gray-300');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.remove('text-gray-300');
                item.classList.add('text-green-400');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Create mailto link
            const subject = `Portfolio Contact from ${name}`;
            const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
            const mailtoLink = `mailto:s.jaspreet.singh.1430@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showNotification('Thank you! Your email client should open now.', 'success');
            
            // Reset form
            this.reset();
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
            type === 'success' ? 'bg-green-500 text-white' : 
            type === 'error' ? 'bg-red-500 text-white' : 
            'bg-blue-500 text-white'
        }`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .education-item, .certificate-item, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Typing animation for hero text
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Add typing effect to hero subtitle
    const heroSubtitle = document.querySelector('#home h2');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 50);
        }, 1000);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('#home');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Skill badges hover effect
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Add glitch effect to name on hover
    const nameElement = document.querySelector('#home h1 span');
    if (nameElement) {
        nameElement.addEventListener('mouseenter', function() {
            this.classList.add('glitch');
            this.setAttribute('data-text', this.textContent);
        });
        
        nameElement.addEventListener('mouseleave', function() {
            this.classList.remove('glitch');
        });
    }

    // Terminal-style typing effect for skills
    function createTerminalEffect() {
        const terminalElements = document.querySelectorAll('.skill-badge');
        terminalElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    element.style.transition = 'all 0.5s ease';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 100);
            }, index * 100);
        });
    }

    // Trigger terminal effect when skills section is visible
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    createTerminalEffect();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillsObserver.observe(skillsSection);
    }

    // Add cyber grid background animation
    function createCyberGrid() {
        const gridContainer = document.createElement('div');
        gridContainer.className = 'fixed inset-0 pointer-events-none opacity-5';
        gridContainer.style.backgroundImage = `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
        `;
        gridContainer.style.backgroundSize = '20px 20px';
        gridContainer.style.animation = 'cyberGridMove 20s linear infinite';
        
        document.body.appendChild(gridContainer);
    }

    // Add cyber grid animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes cyberGridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(20px, 20px); }
        }
    `;
    document.head.appendChild(style);

    // Initialize cyber grid
    createCyberGrid();

    // Add particle effect
    function createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'fixed inset-0 pointer-events-none overflow-hidden';
        particleContainer.style.zIndex = '1';
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute w-1 h-1 bg-green-400 rounded-full opacity-30';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `particleFloat ${5 + Math.random() * 10}s linear infinite`;
            particleContainer.appendChild(particle);
        }
        
        document.body.appendChild(particleContainer);
    }

    // Add particle animation keyframes
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.3;
            }
            90% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Initialize particles
    createParticles();

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add loaded class styles
        const loadedStyle = document.createElement('style');
        loadedStyle.textContent = `
            body:not(.loaded) {
                overflow: hidden;
            }
            body:not(.loaded)::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #111827;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            body:not(.loaded)::after {
                content: 'Loading...';
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #22c55e;
                font-size: 1.5rem;
                font-weight: bold;
                z-index: 10000;
                animation: pulse 1s infinite;
            }
        `;
        document.head.appendChild(loadedStyle);
    });

    // Add scroll progress indicator
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'fixed top-0 left-0 w-0 h-1 bg-gradient-to-r from-green-400 to-blue-500 z-50 transition-all duration-300';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    createScrollProgress();

    // Add theme toggle (optional for future enhancement)
    function createThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'fixed bottom-4 right-4 w-12 h-12 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-gray-300 hover:text-green-400 hover:border-green-400 transition-all duration-300 z-40';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.title = 'Toggle Theme';
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('light-theme')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        });
        
        document.body.appendChild(themeToggle);
    }

    // Uncomment to enable theme toggle
    // createThemeToggle();

    // GitHub Projects API Integration
    async function loadGitHubProjects() {
        const githubProjectsContainer = document.getElementById('github-projects');
        if (!githubProjectsContainer) return;

        try {
            // Show loading state
            githubProjectsContainer.innerHTML = `
                <div class="col-span-full flex items-center justify-center py-8">
                    <div class="flex items-center space-x-2 text-gray-400">
                        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-green-400"></div>
                        <span>Loading projects...</span>
                    </div>
                </div>
            `;

            // Fetch GitHub projects
            const response = await fetch('https://api.github.com/users/jas-preet-singh/repos?sort=updated&per_page=12');
            const projects = await response.json();

            if (projects.length === 0) {
                githubProjectsContainer.innerHTML = `
                    <div class="col-span-full text-center py-8 text-gray-400">
                        <i class="fas fa-code text-4xl mb-4"></i>
                        <p>No projects found</p>
                    </div>
                `;
                return;
            }

            // Filter out forked repositories and create project cards
            const filteredProjects = projects.filter(project => !project.fork && project.name !== 'jas-preet-singh');
            
            githubProjectsContainer.innerHTML = filteredProjects.map((project, index) => `
                <div class="github-project-card ${index % 2 === 0 ? 'card-green' : 'card-blue'}">
                    <div class="project-header">
                        <h4 class="project-title">${project.name}</h4>
                        <div class="project-meta">
                            <span class="project-language">${project.language || 'Text'}</span>
                            <span class="project-stars">⭐ ${project.stargazers_count}</span>
                        </div>
                    </div>
                    <p class="project-description">${project.description || 'No description available'}</p>
                    <div class="project-footer">
                        <div class="project-stats">
                            <span class="stat-item">
                                <i class="fas fa-code-branch"></i>
                                ${project.forks_count}
                            </span>
                            <span class="stat-item">
                                <i class="fas fa-eye"></i>
                                ${project.watchers_count}
                            </span>
                            <span class="stat-item">
                                <i class="fas fa-calendar"></i>
                                ${new Date(project.updated_at).toLocaleDateString()}
                            </span>
                        </div>
                        <a href="${project.html_url}" target="_blank" rel="noopener" class="project-link">
                            <i class="fab fa-github"></i>
                            View Code
                        </a>
                    </div>
                </div>
            `).join('');

        } catch (error) {
            console.error('Error loading GitHub projects:', error);
            githubProjectsContainer.innerHTML = `
                <div class="col-span-full text-center py-8 text-red-400">
                    <i class="fas fa-exclamation-triangle text-4xl mb-4"></i>
                    <p>Failed to load projects</p>
                    <p class="text-sm text-gray-500 mt-2">Please check your internet connection</p>
                </div>
            `;
        }
    }

    // Load GitHub projects when the page loads
    loadGitHubProjects();

    console.log('🚀 Portfolio website loaded successfully!');
    console.log('👨‍💻 Developed by Jaspreet Singh');
    console.log('🔒 Cybersecurity & AI Enthusiast');
});
