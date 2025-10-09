document.addEventListener("DOMContentLoaded", () => {

    const globalPopup = document.getElementById("global-cart-popup");

    function showPopup(message) {
        if (!globalPopup) return;
        globalPopup.textContent = message;
        globalPopup.classList.add("show");  // add .show
        setTimeout(() => globalPopup.classList.remove("show"), 1500);
    }

    function sendAction(action, itemId, quantity) {
        let body = `action=${action}&itemId=${itemId}&quantity=${quantity}`;
        fetch('cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: body
        })
        .then(res => res.json())
        .then(data => {
            if (data.restaurantConflict) {
                if (confirm("Your cart contains items from another restaurant. Remove them and add this item?")) {
                    sendAction("clearAndAdd", data.newItemId, data.newQuantity);
                }
            } else {
                showPopup("Item added to cart!");
            }
        })
        .catch(err => console.error("Cart AJAX Error:", err));
    }

    // Add-to-cart buttons
    document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const itemId = btn.dataset.itemId;
            const container = btn.closest(".menu-details");
            const qtyInput = container.querySelector(".qty-input");
            const quantity = qtyInput ? qtyInput.value : 1;
            sendAction("add", itemId, quantity);
        });
    });

    // Quantity increase/decrease
    document.querySelectorAll(".increase-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const input = btn.previousElementSibling;
            input.value = parseInt(input.value) + 1;
        });
    });

    document.querySelectorAll(".decrease-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const input = btn.nextElementSibling;
            if (parseInt(input.value) > 1) input.value = parseInt(input.value) - 1;
        });
    });

});
