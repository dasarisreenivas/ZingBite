document.addEventListener("DOMContentLoaded", () => {

    // Update cart totals and item subtotals
    function updateTotals(data) {
        // Grand totals
        document.getElementById("item-count-badge").textContent = data.itemCount + " Items";
        document.getElementById("summary-item-count").textContent = "Subtotal (" + data.itemCount + " items)";
        document.getElementById("summary-subtotal").textContent = "₹" + data.subtotal.toFixed(2);
        document.getElementById("summary-shipping").textContent = "₹" + data.shipping.toFixed(2);
        document.getElementById("summary-tax").textContent = "₹" + data.tax.toFixed(2);
        document.getElementById("summary-total").textContent = "₹" + data.total.toFixed(2);

        // Individual item subtotals and quantities
        if (data.items) {
            data.items.forEach(item => {
                const quantityEl = document.getElementById("quantity-" + item.itemId);
                const subtotalEl = document.getElementById("subtotal-" + item.itemId);
                if (quantityEl) quantityEl.textContent = item.quantity;
                if (subtotalEl) subtotalEl.textContent = "Subtotal: ₹" + (item.price * item.quantity).toFixed(2);
            });
        }

        // Empty cart handling
        if (data.itemCount === 0) {
            document.getElementById("cart-items-list").innerHTML =
                "<div class='empty-cart-message'><h3>Your cart is empty.</h3></div>";
            const grandTotalSection = document.getElementById("grand-total-section");
            if (grandTotalSection) grandTotalSection.style.display = "none";
        } else {
            const grandTotalSection = document.getElementById("grand-total-section");
            if (grandTotalSection) grandTotalSection.style.display = "block";
        }
    }

    // Send cart action to server
    function sendAction(action, itemId, quantity) {
        let body = `action=${action}`;
        if (itemId !== undefined) body += `&itemId=${itemId}`;
        if (quantity !== undefined) body += `&quantity=${quantity}`;

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
                updateTotals(data);
            }
        })
        .catch(err => console.error("Cart AJAX Error:", err));
    }

    // Handle clicks for +, -, delete, clear cart
    document.addEventListener("click", (e) => {
        const target = e.target;

        if (target.classList.contains("quantity-btn")) {
            const itemId = target.dataset.itemId;
            const action = target.dataset.action;
            const quantityEl = document.getElementById("quantity-" + itemId);
            let quantity = parseInt(quantityEl.textContent);

            if (action === "increase") quantity++;
            if (action === "decrease" && quantity > 1) quantity--;

            quantityEl.textContent = quantity;
            sendAction("updateQuantity", itemId, quantity);
        }

        if (target.classList.contains("delete-btn")) {
            const itemId = target.dataset.itemId;
            if (confirm("Are you sure you want to remove this item?")) {
                sendAction("remove", itemId);
            }
        }

        if (target.id === "clear-cart-btn") {
            if (confirm("Are you sure you want to clear the cart?")) {
                sendAction("clear");
            }
        }
    });

    // Add-to-cart buttons (menu page)
    document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const itemId = btn.dataset.itemId;
            const quantity = btn.dataset.quantity || 1;
            sendAction("add", itemId, quantity);
        });
    });

});
