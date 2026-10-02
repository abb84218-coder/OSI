/**
 * PT OTOMASI SOLUSI INDONESIA
 * Main JavaScript File (Modular, Responsive & Interactive)
 */

document.addEventListener('DOMContentLoaded', function () {
    // --- 1. HEADER & MOBILE NAVIGATION (NO BLUR, ACCORDION FIX, ZERO GAP) ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');

    // Remove any leftover backdrop element
    document.querySelectorAll('.nav-backdrop').forEach(el => el.remove());

    if (hamburger && navLinks) {
        function toggleNav(e) {
            if (e) e.stopPropagation();
            const isOpen = navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                if (isOpen) {
                    hamburger.classList.add('active');
                    icon.className = 'fas fa-times';
                } else {
                    hamburger.classList.remove('active');
                    icon.className = 'fas fa-bars';
                }
            }
        }

        function closeNav() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
            // Collapse dropdowns
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('show'));
            document.querySelectorAll('.fa-chevron-up').forEach(i => {
                i.classList.remove('fa-chevron-up');
                i.classList.add('fa-chevron-down');
            });
        }

        hamburger.addEventListener('click', toggleNav);

        // Mobile dropdown accordion for Layanan
        document.querySelectorAll('.nav-links > li > a').forEach(link => {
            const dropdown = link.nextElementSibling;
            if (dropdown && dropdown.classList.contains('dropdown')) {
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        e.stopPropagation();
                        const isShown = dropdown.classList.toggle('show');
                        const chevron = link.querySelector('.fa-chevron-down, .fa-chevron-up');
                        if (chevron) {
                            if (isShown) {
                                chevron.classList.remove('fa-chevron-down');
                                chevron.classList.add('fa-chevron-up');
                            } else {
                                chevron.classList.remove('fa-chevron-up');
                                chevron.classList.add('fa-chevron-down');
                            }
                        }
                    }
                });
            } else {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        closeNav();
                    }
                });
            }
        });

        // Sublinks inside dropdown close nav on tap
        document.querySelectorAll('.dropdown a').forEach(subLink => {
            subLink.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    closeNav();
                }
            });
        });

        // Close when clicking outside header or nav
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active')) {
                if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                    closeNav();
                }
            }
        });
    }

    // --- 2. ACTIVE NAV LINK HIGHLIGHT ---
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else if (linkPath !== '#' && !link.classList.contains('active')) {
            link.classList.remove('active');
        }
    });

    // --- 3. PRODUCT CATEGORY FILTERING (product.html) ---
    const productTabs = document.querySelectorAll('.product-categories .category-tab');
    const productCards = document.querySelectorAll('.product-card');

    window.switchProductCategory = function (category) {
        productTabs.forEach(t => {
            if (t.getAttribute('data-category') === category) {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });

        productCards.forEach(card => {
            const cardCat = card.getAttribute('data-category');
            if (category === 'all' || cardCat === category) {
                card.style.display = '';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(15px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 200);
            }
        });
    };

    if (productTabs.length > 0) {
        productTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const category = this.getAttribute('data-category');
                window.switchProductCategory(category);
                if (history.pushState) {
                    history.pushState(null, null, '#' + category);
                }
            });
        });
    }

    // --- 4. SERVICE CATEGORY FILTERING (services.html) ---
    const serviceTabs = document.querySelectorAll('.service-categories .category-tab');
    const serviceCards = document.querySelectorAll('.service-card');

    window.switchServiceCategory = function (category) {
        serviceTabs.forEach(t => {
            if (t.getAttribute('data-category') === category) {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });

        serviceCards.forEach(card => {
            const cardCat = card.getAttribute('data-category');
            if (category === 'all' || cardCat === category) {
                card.style.display = '';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(15px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 200);
            }
        });
    };

    if (serviceTabs.length > 0) {
        serviceTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const category = this.getAttribute('data-category');
                window.switchServiceCategory(category);
                if (history.pushState) {
                    history.pushState(null, null, '#' + category);
                }
            });
        });
    }

    // --- 5. HASH NAVIGATION / SMOOTH SCROLL ---
    document.querySelectorAll('a[href*="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetHref = this.getAttribute('href');
            if (!targetHref || targetHref === '#' || targetHref.startsWith('javascript:')) return;

            const parts = targetHref.split('#');
            const targetPage = parts[0];
            const targetId = parts[1];

            if (targetPage && targetPage !== currentPath && targetPage !== '') {
                return; // Navigate to other page normally
            }

            // Handle product category hash
            if (productTabs.length && document.querySelector(`.product-categories [data-category="${targetId}"]`)) {
                e.preventDefault();
                window.switchProductCategory(targetId);
                const section = document.querySelector('.products');
                if (section) {
                    window.scrollTo({
                        top: section.offsetTop - 85,
                        behavior: 'smooth'
                    });
                }
                return;
            }

            // Handle services category hash
            if (serviceTabs.length && document.querySelector(`.service-categories [data-category="${targetId}"]`)) {
                e.preventDefault();
                window.switchServiceCategory(targetId);
                const section = document.querySelector('.services');
                if (section) {
                    window.scrollTo({
                        top: section.offsetTop - 85,
                        behavior: 'smooth'
                    });
                }
                return;
            }

            const targetElement = document.getElementById(targetId) || document.querySelector(targetHref);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 85,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Check hash on page load (e.g., product.html#material)
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        if (productTabs.length && document.querySelector(`.product-categories [data-category="${hash}"]`)) {
            window.switchProductCategory(hash);
        } else if (serviceTabs.length && document.querySelector(`.service-categories [data-category="${hash}"]`)) {
            window.switchServiceCategory(hash);
        }
    }

    // --- 6. FAQ ACCORDION (contact.html) ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    faqItems.forEach(i => i.classList.remove('active'));
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // --- 7. FAST WHATSAPP QUOTATION HELPER ---
    window.orderProductWA = function (productName) {
        const text = `Halo PT Otomasi Solusi Indonesia,\n\nSaya tertarik untuk meminta informasi dan penawaran harga untuk produk:\n👉 *${productName}*\n\nMohon info ketersediaan stok dan harga penawarannya. Terima kasih!`;
        const url = `https://wa.me/6281284872876?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    window.consultServiceWA = function (serviceName) {
        const text = `Halo PT Otomasi Solusi Indonesia,\n\nSaya ingin berkonsultasi mengenai layanan:\n👉 *${serviceName}*\n\nMohon informasi lebih lanjut mengenai teknis dan penawarannya. Terima kasih!`;
        const url = `https://wa.me/6281284872876?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    // Auto-enhance product and service cards to have instant WhatsApp action
    document.querySelectorAll('.product-card').forEach(card => {
        const titleEl = card.querySelector('h3');
        const actionsEl = card.querySelector('.product-actions');
        if (titleEl && actionsEl && !actionsEl.querySelector('.btn-wa')) {
            const title = titleEl.innerText.trim();
            const waBtn = document.createElement('button');
            waBtn.type = 'button';
            waBtn.className = 'btn btn-wa';
            waBtn.style.marginLeft = '8px';
            waBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Chat WA';
            waBtn.title = 'Minta Penawaran Cepat via WhatsApp';
            waBtn.onclick = function (e) {
                e.stopPropagation();
                window.orderProductWA(title);
            };
            actionsEl.appendChild(waBtn);
        }
    });

    document.querySelectorAll('.service-card').forEach(card => {
        const titleEl = card.querySelector('h3');
        const actionsEl = card.querySelector('.service-actions');
        if (titleEl && actionsEl && !actionsEl.querySelector('.btn-wa')) {
            const title = titleEl.innerText.trim();
            const waBtn = document.createElement('button');
            waBtn.type = 'button';
            waBtn.className = 'btn btn-wa';
            waBtn.style.marginLeft = '8px';
            waBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Chat WA';
            waBtn.title = 'Konsultasi Layanan via WhatsApp';
            waBtn.onclick = function (e) {
                e.stopPropagation();
                window.consultServiceWA(title);
            };
            actionsEl.appendChild(waBtn);
        }
    });

    // --- 8. PROFESSIONAL FORM HANDLING (contact.html & index.html) ---
    // Contact Form on contact.html
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name') ? document.getElementById('name').value.trim() : '';
            const email = document.getElementById('email') ? document.getElementById('email').value.trim() : '';
            const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '-';
            const company = document.getElementById('company') ? document.getElementById('company').value.trim() : '-';
            const subject = document.getElementById('subject') ? document.getElementById('subject').value.trim() : 'Umum';
            const message = document.getElementById('message') ? document.getElementById('message').value.trim() : '';

            if (!name || !email || !message) {
                alert('Harap lengkapi semua bidang yang bertanda bintang (*).');
                return;
            }

            // Construct structured WhatsApp message
            const waMessage = `Halo PT Otomasi Solusi Indonesia,\n\nSaya ingin mengirimkan pesan/permintaan penawaran melalui website:\n- *Nama:* ${name}\n- *Perusahaan:* ${company}\n- *Email:* ${email}\n- *No. Telp:* ${phone}\n- *Subjek:* ${subject}\n- *Pesan:* ${message}\n\nMohon ditindaklanjuti. Terima kasih!`;
            const waUrl = `https://wa.me/6281284872876?text=${encodeURIComponent(waMessage)}`;

            // Open WhatsApp directly for instant delivery
            window.open(waUrl, '_blank');

            // Feedback notice
            alert(`Terima kasih, Bapak/Ibu ${name}!\n\nPesan Anda sedang diteruskan langsung ke WhatsApp resmi PT Otomasi Solusi Indonesia (0812-8487-2876).\nTim kami akan segera membalas pertanyaan atau penawaran Anda.`);
            contactForm.reset();
        });
    }

    // Contact Form on index.html
    const homeContactForm = document.getElementById('homeContactForm');
    if (homeContactForm) {
        homeContactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('homeName') ? document.getElementById('homeName').value.trim() : '';
            const email = document.getElementById('homeEmail') ? document.getElementById('homeEmail').value.trim() : '';
            const phone = document.getElementById('homePhone') ? document.getElementById('homePhone').value.trim() : '-';
            const message = document.getElementById('homeMessage') ? document.getElementById('homeMessage').value.trim() : '';

            if (!name || !email || !message) {
                alert('Harap lengkapi kolom yang wajib diisi.');
                return;
            }

            const waMessage = `Halo PT Otomasi Solusi Indonesia,\n\nSaya ingin berkonsultasi via website:\n- *Nama:* ${name}\n- *Email:* ${email}\n- *No. HP:* ${phone}\n- *Pesan:* ${message}\n\nMohon info dan penawarannya. Terima kasih!`;
            const waUrl = `https://wa.me/6281284872876?text=${encodeURIComponent(waMessage)}`;

            window.open(waUrl, '_blank');
            alert(`Terima kasih, ${name}! Pesan Anda telah diteruskan langsung ke WhatsApp PT Otomasi Solusi Indonesia.`);
            homeContactForm.reset();
        });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Terima kasih telah berlangganan newsletter PT Otomasi Solusi Indonesia!');
            newsletterForm.reset();
        });
    }

    // --- 9. FLOATING WHATSAPP BUTTON (ALL PAGES) ---
    if (!document.querySelector('.whatsapp-float')) {
        const waBtn = document.createElement('a');
        waBtn.href = 'https://wa.me/6281284872876?text=Halo%20PT%20Otomasi%20Solusi%20Indonesia,%20saya%20ingin%20berkonsultasi';
        waBtn.target = '_blank';
        waBtn.rel = 'noopener noreferrer';
        waBtn.className = 'whatsapp-float';
        waBtn.setAttribute('aria-label', 'Chat WhatsApp PT Otomasi Solusi Indonesia');
        waBtn.innerHTML = '<span class="wa-text">Chat WhatsApp Kami</span><i class="fab fa-whatsapp"></i>';
        document.body.appendChild(waBtn);
    }

    // --- 10. ANIMATION ON SCROLL ---
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.service-card, .product-card, .vm-card, .value-card, .truck-card, .contact-card, .faq-item, .gallery-item, .hour-item').forEach(el => {
            observer.observe(el);
        });
    }
});

