document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active'); // Optional for hamburger animation

            // Accessibility
            const isExpanded = mainNav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // 1b. Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.has-dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // 2. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up, .section-header, .news-card, .sector-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        el.style.opacity = '0'; // Ensure hidden initially
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add a class for the visible state in CSS or JS
    // Since I defined .fade-in-up in CSS, I should make sure JS compatible styles work
    // Let's inject a style for .visible to keep it simple or modify existing CSS logic
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // 3. Header Scroll Effect
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Contact Us Modal Logic
    const initContactModal = () => {
        // Create modal HTML
        const modalHTML = `
            <div class="modal-overlay" id="contactModal">
                <div class="modal-container">
                    <button class="modal-close" id="closeModal">&times;</button>
                    <div class="modal-header">
                        <h2>Contact Us</h2>
                        <p>We'd love to hear from you. Please fill out the form below.</p>
                    </div>
                    <form class="modal-form" id="contactForm">
                        <div class="form-group">
                            <label for="name">Full Name <span class="required-star">*</span></label>
                            <input type="text" id="name" name="name" placeholder="Enter your name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email Address <span class="required-star">*</span></label>
                            <input type="email" id="email" name="email" placeholder="Enter your email" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone Number (Optional)</label>
                            <input type="tel" id="phone" name="phone" placeholder="Enter your phone number">
                        </div>
                        <button type="submit" class="btn-submit">Send Message</button>
                    </form>
                </div>
            </div>
        `;

        // Append to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = document.getElementById('contactModal');
        const closeBtn = document.getElementById('closeModal');
        const contactForm = document.getElementById('contactForm');

        const openModal = (e) => {
            if (e) e.preventDefault();
            modal.classList.add('active');
            document.body.classList.add('modal-open');
        };

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        };

        // Close on X click
        closeBtn.addEventListener('click', closeModal);

        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });

        // Form submission
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            console.log('Form Submitted:', Object.fromEntries(formData));

            // Show success (simple alert for now)
            alert('Thank you for your message! We will get back to you soon.');
            closeModal();
            contactForm.reset();
        });

        // Find all Contact Us buttons/links
        const contactLinks = document.querySelectorAll('a[href*="#contact"], .btn-primary, .btn-secondary');
        contactLinks.forEach(link => {
            if (link.textContent.toLowerCase().includes('contact us')) {
                link.addEventListener('click', openModal);
                // Also update the href to prevent scrolling unless JavaScript fails
                link.setAttribute('href', 'javascript:void(0)');
            }
        });
    };

    initContactModal();
});

