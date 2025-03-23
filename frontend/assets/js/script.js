/**
 * Nasha Mukti Portal - Sangli Zilla Parishad
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Make sure language selector is properly positioned
    positionLanguageSelector();
    
    // Header Scroll Animation
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down') && currentScroll > 100) {
            // Scrolling down - hide header only after scrolling 100px down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scrolling up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a nav link
        document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Animate Elements on Scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animated');
            }
        });
    };

    // Add animation classes to elements
    const addAnimationClasses = () => {
        // Hero section animations
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroContent) heroContent.classList.add('animate-on-scroll');
        if (heroImage) heroImage.classList.add('animate-on-scroll');
        
        // User card animations
        document.querySelectorAll('.user-card').forEach((card, index) => {
            card.classList.add('animate-on-scroll');
            card.style.animationDelay = `${index * 0.2}s`;
        });
        
        // Quick links animations
        document.querySelectorAll('.quick-link-card').forEach((card, index) => {
            card.classList.add('animate-on-scroll');
            card.style.animationDelay = `${index * 0.15}s`;
        });
    };

    // Initialize animations
    addAnimationClasses();
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check on page load

    // Language Selector
    const languageSelector = document.getElementById('language-selector');
    
    if (languageSelector) {
        // Set initial language from localStorage or default to English
        const savedLanguage = localStorage.getItem('preferredLanguage') || 'english';
        languageSelector.value = savedLanguage;
        setLanguage(savedLanguage);

        // Change language on select change
        languageSelector.addEventListener('change', function() {
            const selectedLanguage = this.value;
            setLanguage(selectedLanguage);
            localStorage.setItem('preferredLanguage', selectedLanguage);
        });
    }

    // Functions for language selector positioning
    function positionLanguageSelector() {
        const languageToggle = document.querySelector('.language-toggle');
        const header = document.querySelector('header');
        
        if (languageToggle && header) {
            if (window.innerWidth <= 768) {
                languageToggle.style.top = `${header.offsetHeight + 10}px`;
            } else {
                languageToggle.style.top = '1rem';
            }
        }
    }
    
    // Reposition language selector on window resize
    window.addEventListener('resize', positionLanguageSelector);

    // Modal Handling
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const closeBtns = document.querySelectorAll('.close-btn');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');

    // Open login modal
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', () => {
            loginModal.classList.add('active');
        });
    }

    // Open register modal
    if (registerBtn && registerModal) {
        registerBtn.addEventListener('click', () => {
            registerModal.classList.add('active');
        });
    }

    // Close modals
    if (closeBtns) {
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (loginModal) loginModal.classList.remove('active');
                if (registerModal) registerModal.classList.remove('active');
            });
        });
    }

    // Switch between login and register modals
    if (showRegister && registerModal && loginModal) {
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.remove('active');
            registerModal.classList.add('active');
        });
    }

    if (showLogin && loginModal && registerModal) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerModal.classList.remove('active');
            loginModal.classList.add('active');
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (loginModal && e.target === loginModal) {
            loginModal.classList.remove('active');
        }
        if (registerModal && e.target === registerModal) {
            registerModal.classList.remove('active');
        }
    });

    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialSlider && testimonialCards.length > 0) {
        let currentSlide = 0;
        const maxSlides = testimonialCards.length - 1;

        // Show only one testimonial at a time
        testimonialCards.forEach((card, index) => {
            if (index !== 0) {
                card.style.display = 'none';
            }
        });

        // Previous and Next buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                testimonialCards[currentSlide].style.display = 'none';
                currentSlide = (currentSlide === 0) ? maxSlides : (currentSlide - 1);
                testimonialCards[currentSlide].style.display = 'block';
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                testimonialCards[currentSlide].style.display = 'none';
                currentSlide = (currentSlide === maxSlides) ? 0 : (currentSlide + 1);
                testimonialCards[currentSlide].style.display = 'block';
            });
        }

        // Auto slide every 5 seconds
        setInterval(() => {
            if (nextBtn) {
                nextBtn.click();
            }
        }, 5000);
    }

    // Form Handling
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            try {
                const response = await api.login(email, password);
                
                if (response.token) {
                    showNotification('Login successful!', 'success');
                    loginModal.classList.remove('active');
                    // Update UI for logged in user
                    updateUIForLoggedInUser(response);
                }
            } catch (error) {
                showNotification('Login failed. Please check your credentials.', 'error');
            }
        });
    }

    // Register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const userData = {
                name: document.getElementById('register-name').value,
                email: document.getElementById('register-email').value,
                phone: document.getElementById('register-phone').value,
                password: document.getElementById('register-password').value,
                confirmPassword: document.getElementById('register-confirm-password').value
            };
            
            if (userData.password !== userData.confirmPassword) {
                showNotification('Passwords do not match!', 'error');
                return;
            }
            
            try {
                const response = await api.register(userData);
                
                showNotification('Registration successful! Please login.', 'success');
                registerModal.classList.remove('active');
                loginModal.classList.add('active');
            } catch (error) {
                showNotification('Registration failed. Please try again.', 'error');
            }
        });
    }
});

// Function to set language throughout the site
function setLanguage(language) {
    const elementsWithTranslation = document.querySelectorAll('[data-en][data-mr]');
    
    elementsWithTranslation.forEach(element => {
        const text = language === 'english' ? element.getAttribute('data-en') : element.getAttribute('data-mr');
        element.textContent = text;
    });
}

// Show Notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Add animation class
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Update UI for logged in user
function updateUIForLoggedInUser(userData) {
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        authButtons.innerHTML = `
            <div class="user-menu">
                <button class="btn btn-outline user-btn">
                    <i class="fas fa-user"></i>
                    ${userData.name}
                </button>
                <div class="user-dropdown">
                    <a href="pages/profile.html"><i class="fas fa-user-circle"></i> Profile</a>
                    <a href="pages/dashboard.html"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
                    <a href="#" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
                </div>
            </div>
        `;
        
        // Add logout functionality
        document.getElementById('logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            api.clearToken();
            window.location.reload();
        });
    }
}

// API Service for backend calls (for future implementation)
class ApiService {
    constructor(baseUrl = 'http://localhost:5000/api') {
        this.baseUrl = baseUrl;
        this.token = localStorage.getItem('token') || null;
    }

    // Set auth token
    setToken(token) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    // Clear auth token
    clearToken() {
        this.token = null;
        localStorage.removeItem('token');
    }

    // Generic fetch method with authorization
    async fetchData(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        
        // Set up headers
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
        
        // Add auth token if it exists
        if (this.token) {
            headers.Authorization = `Bearer ${this.token}`;
        }
        
        try {
            const response = await fetch(url, {
                ...options,
                headers
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // User authentication methods
    async login(email, password) {
        const data = await this.fetchData('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        
        if (data.token) {
            this.setToken(data.token);
        }
        
        return data;
    }

    async register(userData) {
        return await this.fetchData('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    async getUserProfile() {
        return await this.fetchData('/auth/profile');
    }

    // Assessment methods
    async getAssessments() {
        return await this.fetchData('/assessment');
    }

    async getAssessmentById(id) {
        return await this.fetchData(`/assessment/${id}`);
    }

    async submitAssessment(id, answers) {
        return await this.fetchData(`/assessment/${id}/submit`, {
            method: 'POST',
            body: JSON.stringify({ answers })
        });
    }

    // Rehab center methods
    async getRehabCenters(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        return await this.fetchData(`/rehab-centers?${queryParams}`);
    }

    // Events methods
    async getEvents() {
        return await this.fetchData('/events');
    }

    async registerForEvent(eventId) {
        return await this.fetchData(`/events/${eventId}/register`, {
            method: 'POST'
        });
    }

    // Community methods
    async getCommunityPosts(category) {
        const queryParams = category ? `?category=${category}` : '';
        return await this.fetchData(`/community${queryParams}`);
    }

    async createCommunityPost(postData) {
        return await this.fetchData('/community', {
            method: 'POST',
            body: JSON.stringify(postData)
        });
    }

    // Resources methods
    async getResources(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        return await this.fetchData(`/resources?${queryParams}`);
    }
}

// Initialize API service (for future use)
const api = new ApiService(); 