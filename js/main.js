// Initialize AOS animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100 // Offset for better scroll triggering
    });

    // Countdown Timer
    function updateCountdown() {
        const now = new Date();
        const targetDate = new Date();
        targetDate.setDate(now.getDate() + 3);
        targetDate.setHours(now.getHours() + 18);
        targetDate.setMinutes(now.getMinutes() + 45);

        const diff = targetDate - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('countdown-days').innerText = String(days).padStart(2, '0');
        document.getElementById('countdown-hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('countdown-minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('countdown-seconds').innerText = String(seconds).padStart(2, '0');
    }

    // Start countdown timer
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Weather API simulation
    function updateWeather() {
        const weatherConditions = [
            { temp: Math.floor(Math.random() * 5) + 12, conditions: "Partly Cloudy", icon: "fa-cloud-sun" },
            { temp: Math.floor(Math.random() * 3) + 15, conditions: "Sunny", icon: "fa-sun" },
            { temp: Math.floor(Math.random() * 3) + 10, conditions: "Light Rain", icon: "fa-cloud-rain" },
            { temp: Math.floor(Math.random() * 4) + 11, conditions: "Overcast", icon: "fa-cloud" }
        ];

        const weatherData = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];

        document.getElementById('weather-temp').innerText = `${weatherData.temp}°C`;
        document.getElementById('weather-desc').innerText = weatherData.conditions;

        // Update weather icon if it exists
        const weatherIcon = document.querySelector('.weather-widget i');
        if (weatherIcon) {
            // Remove all existing classes except 'fas' and 'me-3' and 'fa-3x'
            weatherIcon.className = 'fas fa-3x me-3';
            // Add the new icon class
            weatherIcon.classList.add(weatherData.icon);
        }
    }

    // Initial weather update
    updateWeather();
    // Update weather periodically
    setInterval(updateWeather, 60000);

    // Make feature cards clickable
    document.querySelectorAll('.feature-highlight').forEach(card => {
        card.addEventListener('click', function() {
            const link = this.querySelector('a');
            if (link) {
                link.click();
            }
        });

        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const link = this.querySelector('a');
                if (link) {
                    link.click();
                }
            }
        });
    });

    // Simple testimonial slider
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    if (testimonialDots.length > 0) {
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Remove active class from all dots and items
                document.querySelectorAll('.testimonial-dot').forEach(d => d.classList.remove('active'));
                document.querySelectorAll('.testimonial-item').forEach(i => i.classList.remove('active'));

                // Add active class to clicked dot and corresponding item
                dot.classList.add('active');
                document.querySelectorAll('.testimonial-item')[index].classList.add('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - navbarHeight - 20, // Add extra offset for breathing room
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fixed navbar adjustments
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.padding = '10px 0';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98) !important';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95) !important';
        }
    });

    // Form validation
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value.trim() === '') {
                alert('Please enter your email address');
                return;
            }

            // Simulate successful subscription
            emailInput.value = '';
            alert('Thank you for subscribing!');
        });
    }

    // Search form functionality
    const searchForm = document.querySelector('.hero-section form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const experienceType = document.getElementById('experienceType').value;
            const budget = document.getElementById('budget').value;

            if (experienceType === 'Experience Type' || budget === 'Budget') {
                alert('Please select both experience type and budget');
                return;
            }

            // Scroll to relevant section (for demo purposes)
            const targetSection = document.getElementById('featured-deals');
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({
                    top: targetSection.offsetTop - navbarHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    }
});