document.addEventListener('DOMContentLoaded', () => {

    // ---- AOS Init ----
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80,
            delay: 0,
        });
    }

    // ---- Custom Hamburger Menu Animation ----
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarNav');

    if (navbarToggler && navbarCollapse) {
        // Build animated hamburger icon
        navbarToggler.classList.add('hamburger-animated');

        const iconSpan = navbarToggler.querySelector('.navbar-toggler-icon');
        if (iconSpan) {
            iconSpan.classList.add('hamburger-lines');
            iconSpan.innerHTML = '';
        }

        // Track open/closed state for custom animation
        navbarToggler.addEventListener('click', () => {
            const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
            navbarToggler.classList.toggle('is-active', !isExpanded);
        });

        // Close menu when clicking a nav link (mobile)
        navbarCollapse.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                    navbarToggler.classList.remove('is-active');
                }
            });
        });

        // Close menu when clicking outside (mobile)
        document.addEventListener('click', (e) => {
            if (!navbarCollapse.contains(e.target) &&
                !navbarToggler.contains(e.target) &&
                navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
                navbarToggler.classList.remove('is-active');
            }
        });
    }

    // ---- Navbar Scroll Effect ----
    const navbar = document.querySelector('.navbar');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (navbar) {
            if (currentScrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }

        lastScrollY = currentScrollY;
    }, { passive: true });

    // ---- Portfolio Filtering with Smooth Transitions ----
    const filterButtons = document.querySelectorAll('.filter-btns .btn[data-filter]');

    function filterSelection(category, clickedBtn) {
        const items = document.querySelectorAll('.portfolio-item');

        items.forEach(item => {
            const show = (category === 'all' || item.classList.contains(category));

            if (show) {
                item.style.display = 'block';
                // Slight delay so the display change registers, then animate in
                requestAnimationFrame(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1) translateY(0)';
                    item.classList.remove('aos-animate');
                    void item.offsetWidth;
                    item.classList.add('aos-animate');
                });
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.95) translateY(10px)';
                // Wait for fade-out transition before hiding
                setTimeout(() => {
                    if (item.style.opacity === '0') {
                        item.style.display = 'none';
                    }
                }, 300);
            }
        });

        filterButtons.forEach(btn => btn.classList.remove('active'));
        if (clickedBtn) clickedBtn.classList.add('active');
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => filterSelection(btn.dataset.filter, btn));
    });

    if (filterButtons.length > 0) {
        filterSelection('all', filterButtons[0]);
    }

    // ---- Current Year in Footer ----
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ---- Contact Form Success Message ----
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const honeypot = this.querySelector('input[name="_honey"]');
            if (honeypot && honeypot.value !== '') {
                e.preventDefault();
                return false;
            }

            if (formSuccess) {
                formSuccess.classList.add('show');
                contactForm.style.display = 'none';
            }
        });
    }

    // ---- Back to Top Button ----
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- Smooth Scrolling for In-Page Anchor Links ----
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ---- Reveal-on-Scroll for Portfolio Items ----
    // Adds a subtle parallax tilt to portfolio cards on mouse move (desktop only)
    if (window.matchMedia('(min-width: 992px)').matches) {
        document.querySelectorAll('.portfolio-image-wrapper').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'transform 0.3s ease';
            });

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    // ---- Modal Open/Close Smooth Animations ----
    document.querySelectorAll('.portfolio-modal').forEach(modal => {
        const img = modal.querySelector('img');
        if (img) {
            modal.addEventListener('shown.bs.modal', () => {
                img.style.animation = 'zoomIn 0.5s ease-out forwards';
            });
        }
    });
});
