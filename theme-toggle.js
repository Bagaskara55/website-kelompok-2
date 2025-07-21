document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    if (themeToggle && themeIcon) {
        themeToggle.addEventListener('click', toggleTheme);
        updateThemeIcon();
    }
    
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.body.setAttribute('data-theme', savedTheme);
    }
    
    function toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
        animateToggleButton();
        updateNavbarBackground();
    }
    
    function updateThemeIcon() {
        const themeIcon = document.getElementById('themeIcon');
        const themeToggle = document.getElementById('themeToggle');
        
        if (themeIcon && themeToggle) {
            const currentTheme = document.body.getAttribute('data-theme') || 'light';
            
            if (currentTheme === 'dark') {
                themeIcon.className = 'bi bi-moon-fill';
                themeToggle.title = 'Switch to Light Mode';
            } else {
                themeIcon.className = 'bi bi-sun-fill';
                themeToggle.title = 'Switch to Dark Mode';
            }
        }
    }
    
    function animateToggleButton() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 150);
        }
    }
    
    function updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        const currentTheme = document.body.getAttribute('data-theme') || 'light';
        const isScrolled = window.scrollY > 50;
        
        if (isScrolled) {
            if (currentTheme === 'dark') {
                navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            }
        }
    }
    window.addEventListener('scroll', updateNavbarBackground);
});


(function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (document.body) {
        document.body.setAttribute('data-theme', savedTheme);
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            document.body.setAttribute('data-theme', savedTheme);
        });
    }
})();
