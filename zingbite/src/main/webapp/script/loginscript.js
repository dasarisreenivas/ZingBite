// Get form and inputs
const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Client-side validation
form.addEventListener('submit', function(e) {
    let valid = true;

    // Remove previous error highlights
    emailInput.classList.remove('input-error');
    passwordInput.classList.remove('input-error');

    // Email validation
    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
        emailInput.classList.add('input-error');
        valid = false;
    }

    // Password validation
    const password = passwordInput.value;
    if (!password || password.length < 6) {
        passwordInput.classList.add('input-error');
        valid = false;
    }

    if (!valid) {
        e.preventDefault(); // Stop form submission if invalid
    }
});

// Optional: Add red border style for invalid input
// Add this to your CSS:
/*
.input-error {
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}
*/

// Hero slideshow
const slides = document.querySelectorAll('.hero-slideshow img');
let current = 0;
setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
}, 2000);
