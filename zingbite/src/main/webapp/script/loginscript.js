const form = document.getElementById('loginForm');
   const emailInput = document.getElementById('email');
   const passwordInput = document.getElementById('password');
   const emailError = document.getElementById('emailError');
   const passwordError = document.getElementById('passwordError');

   form.addEventListener('submit', function(e) {
     let valid = true;
     emailError.style.display = 'none';
     passwordError.style.display = 'none';

     const email = emailInput.value.trim();
     const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
     if (!email || !emailPattern.test(email)) {
       emailError.style.display = 'block';
       valid = false;
     }

     const password = passwordInput.value;
     if (!password || password.length < 6) {
       passwordError.style.display = 'block';
       valid = false;
     }

     if (!valid) e.preventDefault();
   });

   // Slideshow
   const slides = document.querySelectorAll('.hero-slideshow img');
   let current = 0;
   setInterval(() => {
     slides[current].classList.remove('active');
     current = (current + 1) % slides.length;
     slides[current].classList.add('active');
   }, 4000);