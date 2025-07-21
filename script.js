document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const heroSection = document.getElementById('dashboard');
    if (navbar) {
        const updateNavbarStyle = () => {
            if (!heroSection || window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        updateNavbarStyle();
        window.addEventListener('scroll', updateNavbarStyle);
    }

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navHeight = navbar ? navbar.offsetHeight : 70;

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - navHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href').split('#')[0];
            const currentPath = window.location.pathname.split('/').pop();
            
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            } else if (linkHref === currentPath) {
                link.classList.add('active');
            }
        });
    });

    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('form-success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            successMessage.classList.add('d-none');

            if (!contactForm.checkValidity()) {
                contactForm.classList.add('was-validated');
                return;
            }
            
            const nama = document.getElementById('nama').value;
            console.log(`Mengirim data dari: ${nama}`);
            
            successMessage.textContent = `Terima kasih, ${nama}! Pesan Anda telah berhasil dikirim.`;
            successMessage.classList.remove('d-none');
            
            contactForm.reset();
            contactForm.classList.remove('was-validated');
        });
    }

    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        const iframe = videoModal.querySelector('iframe');
        const originalSrc = iframe.src;

        videoModal.addEventListener('shown.bs.modal', () => {
            const autoplayUrl = originalSrc.includes('?') ? originalSrc + '&autoplay=1' : originalSrc + '?autoplay=1';
            iframe.src = autoplayUrl;
        });

        videoModal.addEventListener('hidden.bs.modal', () => {
            iframe.src = originalSrc;
        });
    }
});
