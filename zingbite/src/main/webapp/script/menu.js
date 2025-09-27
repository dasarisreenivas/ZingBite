document.addEventListener('DOMContentLoaded', () => {
    const allForms = document.querySelectorAll('.add-to-cart-form');

    allForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const popup = form.nextElementSibling;
            const formData = new FormData(form);

            fetch('cart', {
                method: 'POST',
                body: new URLSearchParams(formData)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.message || 'Server error'); });
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'success') {
                    showPopup(popup, data.message || 'Item added to cart! ✅');
                } else {
                    showPopup(popup, data.message || 'Could not add item.', true);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showPopup(popup, 'Request failed. Please try again.', true);
            });
        });
    });
});

/**
 * Show popup and hide after delay
 */
function showPopup(popupElement, message, isError = false) {
    if (!popupElement) return;

    popupElement.textContent = message;
    popupElement.style.color = '#fff';
    popupElement.style.backgroundColor = isError ? '#dc3545' : '#28a745';

    popupElement.classList.remove('popup-hidden');
    popupElement.classList.add('show');

    setTimeout(() => {
        popupElement.classList.remove('show');
        setTimeout(() => {
            popupElement.classList.add('popup-hidden');
        }, 400);
    }, 1500);
}

// Quantity
function increaseQty(button) {
    const input = button.previousElementSibling;
    input.value = parseInt(input.value, 10) + 1;
}

function decreaseQty(button) {
    const input = button.nextElementSibling;
    const currentValue = parseInt(input.value, 10);
    if (currentValue > 1) {
        input.value = currentValue - 1;
    }
}
