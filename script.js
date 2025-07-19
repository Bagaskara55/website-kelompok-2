document.addEventListener('DOMContentLoaded', function() {

    // --- Fitur 1: Efek Navbar saat Scroll ---
    const navbar = document.querySelector('.navbar');
    const heroSection = document.getElementById('dashboard'); // Cek apakah ada hero section

    if (navbar) {
        // Fungsi untuk update style navbar
        const updateNavbarStyle = () => {
            // Jika tidak ada hero section (bukan di homepage) atau jika sudah di-scroll
            if (!heroSection || window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };

        // Jalankan saat pertama kali load
        updateNavbarStyle(); 
        
        // Jalankan setiap kali scroll
        window.addEventListener('scroll', updateNavbarStyle);
    }

    // --- Fitur 2: Navigasi Aktif saat Scroll ---
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
            // Cek href tanpa hash (#) untuk halaman artikel
            const linkHref = link.getAttribute('href').split('#')[0];
            const currentPath = window.location.pathname.split('/').pop();
            
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            } else if (linkHref === currentPath) {
                // Untuk menandai link 'Blog' aktif di halaman artikel
                link.classList.add('active');
            }
        });
    });

    // --- Fitur 3: Validasi Form Kontak Modern ---
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
    
    // --- Fitur 4: Kontrol Video Modal ---
    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        const iframe = videoModal.querySelector('iframe');
        const originalSrc = iframe.src;

        // Tambahkan autoplay saat modal dibuka
        videoModal.addEventListener('shown.bs.modal', () => {
            // Tambahkan parameter autoplay ke URL
            const autoplayUrl = originalSrc.includes('?') ? originalSrc + '&autoplay=1' : originalSrc + '?autoplay=1';
            iframe.src = autoplayUrl;
        });

        // Hentikan video saat modal ditutup
        videoModal.addEventListener('hidden.bs.modal', () => {
            iframe.src = originalSrc;
        });
    }
});
