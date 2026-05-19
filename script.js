/* ========================================
   Afiyat Global — Main Script
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => preloader.classList.add('hidden'), 500);
    });
    setTimeout(() => preloader.classList.add('hidden'), 3000);

    // Header scroll effect
    const header = document.getElementById('header');
    const onScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');

    const closeMenu = () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    const openMenu = () => {
        hamburger.classList.add('active');
        navLinks.classList.add('active');
        if (navOverlay) navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    hamburger.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // AOS-like scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const delay = parseInt(el.getAttribute('data-aos-delay') || 0);
            if (rect.top < window.innerHeight - 80) {
                setTimeout(() => el.classList.add('aos-animate'), delay);
            }
        });
    };
    window.addEventListener('scroll', animateOnScroll, { passive: true });
    animateOnScroll();

    // Counter animation
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                let current = 0;
                const increment = target / 40;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        entry.target.textContent = target;
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.ceil(current);
                    }
                }, 50);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // Language Switcher
    const langBtns = document.querySelectorAll('.lang-btn');
    let currentLang = 'en';

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang === currentLang) return;

            currentLang = lang;
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            document.querySelectorAll('[data-' + lang + ']').forEach(el => {
                const text = el.getAttribute('data-' + lang);
                if (text) {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        // skip form inputs
                    } else if (el.tagName === 'OPTION') {
                        el.textContent = text;
                    } else {
                        el.textContent = text;
                    }
                }
            });

            document.documentElement.lang = lang === 'jp' ? 'ja' : lang === 'uz' ? 'uz' : 'en';
        });
    });

    // Contact form
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value;
            const product = document.getElementById('product').value;
            const message = document.getElementById('message').value;

            const subject = encodeURIComponent(`Inquiry from ${name} - ${company || 'N/A'}`);
            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nProduct: ${product}\n\nMessage:\n${message}`
            );

            window.location.href = `mailto:sales@afiyatglobal.com?subject=${subject}&body=${body}`;

            const btn = form.querySelector('button[type="submit"]');
            const original = btn.textContent;
            btn.textContent = currentLang === 'jp' ? '送信済み ✓' : currentLang === 'uz' ? 'Yuborildi ✓' : 'Sent ✓';
            btn.style.background = 'var(--green)';
            setTimeout(() => {
                btn.textContent = original;
                btn.style.background = '';
                form.reset();
            }, 3000);
        });
    }

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    const highlightNav = () => {
        const scrollPos = window.scrollY + 150;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + id) {
                        item.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', highlightNav, { passive: true });

    // Hero rotating background images
    const heroBg = document.querySelector('.hero-bg-video');
    if (heroBg) {
        const heroBgImages = [
            'images/apple-concentrate.jpg',
            'images/grape-concentrate.jpg',
            'images/pomegranate-concentrate.jpg'
        ];
        let heroBgIndex = 0;

        setInterval(() => {
            heroBgIndex = (heroBgIndex + 1) % heroBgImages.length;
            heroBg.style.backgroundImage = `url('${heroBgImages[heroBgIndex]}')`;
        }, 6000);
    }
});
