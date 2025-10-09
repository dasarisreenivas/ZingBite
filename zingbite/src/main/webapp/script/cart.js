document.addEventListener("DOMContentLoaded", () => {

    // Update cart totals dynamically in the DOM
    function updateTotals(data) {
        document.getElementById("item-count-badge").textContent = data.itemCount + " Items";
        document.getElementById("summary-item-count").textContent = "Subtotal (" + data.itemCount + " items)";
        document.getElementById("summary-subtotal").textContent = "₹" + data.subtotal.toFixed(2);
        document.getElementById("summary-shipping").textContent = "₹" + data.shipping.toFixed(2);
        document.getElementById("summary-total").textContent = "₹" + data.total.toFixed(2);

        if (data.itemCount === 0) {
            document.getElementById("cart-items-list").innerHTML =
                "<div class='empty-cart-message'><h3>Your cart is empty.</h3></div>";
            document.getElementById("grand-total-section").style.display = "none";
        }
    }

    // Send cart actions via AJAX
    function sendAction(action, itemId, quantity) {
        let body = `action=${action}`;
        if (itemId) body += `&itemId=${itemId}`;
        if (quantity) body += `&quantity=${quantity}`;

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
                if (confirm("Your cart contains items from another restaurant. Do you want to remove them and add this item?")) {
                    sendAction("clearAndAdd", data.newItemId, data.newQuantity);
                }
            } else {
                updateTotals(data);
            }
        })
        .catch(err => console.error("Cart AJAX Error:", err));
    }

    // Quantity buttons (+ / -)
    document.addEventListener("click", function(e) {
        if (e.target.classList.contains("quantity-btn")) {
            const itemId = e.target.dataset.itemId;
            const action = e.target.dataset.action;
            sendAction(action, itemId);
        }
        if (e.target.classList.contains("delete-btn")) {
            const itemId = e.target.dataset.itemId;
            if (confirm("Are you sure you want to remove this item?")) {
                sendAction("remove", itemId);
            }
        }
        if (e.target.id === "clear-cart-btn") {
            if (confirm("Are you sure you want to clear the cart?")) {
                sendAction("clear");
            }
        }
    });

    // Add-to-cart buttons on menu page
    document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const itemId = btn.dataset.itemId;
            const quantity = btn.dataset.quantity || 1;
            sendAction("add", itemId, quantity);
        });
    });

});
