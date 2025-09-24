document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.querySelector('form');

  // Feedback box on top
  const feedbackBox = document.createElement('div');
  feedbackBox.classList.add('feedback-box');
  feedbackBox.style.display = 'none';
  feedbackBox.style.padding = '10px';
  feedbackBox.style.marginBottom = '15px';
  feedbackBox.style.borderRadius = '5px';
  feedbackBox.style.fontSize = '0.9rem';
  feedbackBox.style.backgroundColor = '#ffe6e6';
  feedbackBox.style.color = '#d8000c';
  registerForm.prepend(feedbackBox);

  const usernameInput = registerForm.querySelector('input[name="username"]');
  const emailInput = registerForm.querySelector('input[name="email"]');
  const mobileInput = registerForm.querySelector('input[name="mobile"]');
  const passwordInput = registerForm.querySelector('input[name="password"]');
  const confirmInput = registerForm.querySelector('input[name="confirmPassword"]');
  const addressInput = registerForm.querySelector('textarea[name="address"]');

  // Validation functions
  function validateUsername() {
    return usernameInput.value.trim().length < 3 ? 'Username must be at least 3 characters long.' : null;
  }
  function validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !regex.test(emailInput.value.trim()) ? 'Please enter a valid email address.' : null;
  }
  function validateMobile() {
    const regex = /^[0-9]{10}$/;
    return !regex.test(mobileInput.value.trim()) ? 'Mobile number must be exactly 10 digits.' : null;
  }
  function validatePassword() {
    return passwordInput.value.length < 6 ? 'Password must be at least 6 characters long.' : null;
  }
  function validateConfirmPassword() {
    return passwordInput.value !== confirmInput.value ? 'Passwords do not match!' : null;
  }
  function validateAddress() {
    return addressInput.value.trim().length < 5 ? 'Address must be at least 5 characters long.' : null;
  }

  // Show feedback for a single field
  function showFieldFeedback(message, isError = true) {
    if (!message) {
      feedbackBox.style.display = 'none';
      return;
    }
    feedbackBox.innerHTML = message;
    feedbackBox.style.display = 'block';
    feedbackBox.style.backgroundColor = isError ? '#ffe6e6' : '#e6ffed';
    feedbackBox.style.color = isError ? '#d8000c' : '#007a1c';
  }

  // Field-specific validation events
  usernameInput.addEventListener('input', () => showFieldFeedback(validateUsername()));
  emailInput.addEventListener('input', () => showFieldFeedback(validateEmail()));
  mobileInput.addEventListener('input', () => showFieldFeedback(validateMobile()));
  passwordInput.addEventListener('input', () => showFieldFeedback(validatePassword()));
  confirmInput.addEventListener('input', () => showFieldFeedback(validateConfirmPassword()));
  addressInput.addEventListener('input', () => showFieldFeedback(validateAddress()));

  // On submit: show all errors or success
  registerForm.addEventListener('submit', (e) => {
    const errors = [
      validateUsername(),
      validateEmail(),
      validateMobile(),
      validatePassword(),
      validateConfirmPassword(),
      validateAddress()
    ].filter(Boolean);

    if (errors.length > 0) {
      showFieldFeedback(errors.join('<br>'));
      e.preventDefault(); // stop submit if errors
    } else {
      showFieldFeedback('Registration successful! Redirecting to login...', false);
      feedbackBox.style.display = 'block';
      // Optional: redirect after 2s
      setTimeout(() => {
        registerForm.submit(); // actually submit the form
      }, 1000);
      e.preventDefault(); // prevent immediate submission to allow showing success message
    }
  });
});
const slides = document.querySelectorAll('.hero-slideshow img');
let current = 0;
setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
}, 2000);
