// Sort dropdown
const select = document.querySelector('.custom-select');
const trigger = select.querySelector('.custom-select-trigger');
const options = select.querySelectorAll('.custom-option');
const hiddenInput = document.getElementById('sort');
const form = document.querySelector('.sort-form');

trigger.addEventListener('click', () => select.classList.toggle('open'));

options.forEach(option => {
    option.addEventListener('click', () => {
        trigger.textContent = "Sort by: " + option.textContent;
        hiddenInput.value = option.dataset.value;
        select.classList.remove('open');
        options.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        form.submit();
    });
});

window.addEventListener('click', e => {
    if (!select.contains(e.target)) select.classList.remove('open');
});

// Play video on hover
document.querySelectorAll('.restaurant-card').forEach(card => {
    const video = card.querySelector('.card-video');
    card.addEventListener('mouseenter', () => {
        video.style.opacity = '1';
        video.play().catch(err => console.log('Video play error:', err));
    });
    card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
        video.style.opacity = '0';
    });
});
