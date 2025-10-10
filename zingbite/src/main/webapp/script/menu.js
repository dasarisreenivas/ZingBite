document.addEventListener("DOMContentLoaded", () => {

    const globalPopup = document.getElementById("cartPopup");
    const popupItemName = document.getElementById("popupItemName");
    let popupTimeout;

    function showPopup(itemName, message) {
        if (!globalPopup) return;
        if (popupTimeout) clearTimeout(popupTimeout);

        if (popupItemName)
            popupItemName.textContent = message || `${itemName} added to cart`;

        globalPopup.classList.add("active");
        globalPopup.classList.remove("closing");

        popupTimeout = setTimeout(() => closePopup(), 3000);
    }

    function closePopup() {
        if (!globalPopup) return;
        globalPopup.classList.add("closing");
        setTimeout(() => globalPopup.classList.remove("active", "closing"), 300);
    }

    function sendAction(action, itemId, quantity, itemName) {
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
                    sendAction("clearAndAdd", data.newItemId, data.newQuantity, itemName);
                }
            } else {
                showPopup(itemName, "Item updated in cart!");
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
            const itemName = container.querySelector(".item-name").textContent;
            sendAction("add", itemId, quantity, itemName);
        });
    });

    // Quantity increase/decrease (live updates)
    document.querySelectorAll(".increase-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const input = btn.previousElementSibling;
            input.value = parseInt(input.value) + 1;
            const container = btn.closest(".menu-details");
            const itemId = container.querySelector(".add-to-cart-btn").dataset.itemId;
            const itemName = container.querySelector(".item-name").textContent;
            sendAction("updateQuantity", itemId, input.value, itemName);
        });
    });

    document.querySelectorAll(".decrease-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const input = btn.nextElementSibling;
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
                const container = btn.closest(".menu-details");
                const itemId = container.querySelector(".add-to-cart-btn").dataset.itemId;
                const itemName = container.querySelector(".item-name").textContent;
                sendAction("updateQuantity", itemId, input.value, itemName);
            }
        });
    });
});


// Play video on hover, show image otherwise
document.querySelectorAll(".media-container").forEach(container => {
    const img = container.querySelector("img.item-img");
    const video = container.querySelector("video.item-video");

    container.addEventListener("mouseenter", () => {
        img.style.display = "none";
        video.style.display = "block";
        video.play();
    });

    container.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0; // reset video to start
        video.style.display = "none";
        img.style.display = "block";
    });
});
