document.addEventListener('DOMContentLoaded', function() {

    // --- Fitur 1: Efek Navbar saat Scroll ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Cek posisi awal untuk kasus refresh di tengah halaman
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        }
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
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
            if (link.getAttribute('href').includes(current)) {
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
    
    // --- BARU: Fitur 4: Kontrol Video Modal ---
    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        const iframe = videoModal.querySelector('iframe');
        const originalSrc = iframe.src;

        // Tambahkan autoplay saat modal dibuka
        videoModal.addEventListener('shown.bs.modal', () => {
            iframe.src = originalSrc + "?autoplay=1";
        });

        // Hentikan video saat modal ditutup
        videoModal.addEventListener('hidden.bs.modal', () => {
            iframe.src = originalSrc;
        });
    }
});
