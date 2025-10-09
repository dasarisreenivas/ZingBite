document.addEventListener("DOMContentLoaded", function() {
    var cartContainer = document.querySelector(".cart-items-list");
    if (!cartContainer) return;

    cartContainer.addEventListener("click", function(e) {
        var target = e.target;
        var itemId = target.dataset.itemId;
        if (!itemId) return;

        if (target.classList.contains("quantity-btn")) {
            var action = target.dataset.action;
            updateQuantity(itemId, action);
        }

        if (target.classList.contains("delete-btn")) {
            if (confirm("Remove this item from your cart?")) {
                removeItem(itemId);
            }
        }
    });

    function updateQuantity(itemId, action) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "cart", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.onload = function() {
            if (xhr.status === 200) {
                updateCartUI(itemId, action);
            } else {
                alert("Failed to update quantity.");
            }
        };
        xhr.send("action=" + encodeURIComponent(action) + "&itemId=" + encodeURIComponent(itemId));
    }

    function removeItem(itemId) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "cart", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.onload = function() {
            if (xhr.status === 200) {
                var itemElement = document.getElementById("item-" + itemId);
                if (itemElement) itemElement.parentNode.removeChild(itemElement);
                recalculateTotals();
                checkEmptyCart();
            } else {
                alert("Failed to remove item.");
            }
        };
        xhr.send("action=remove&itemId=" + encodeURIComponent(itemId));
    }

    function updateCartUI(itemId, action) {
        var itemElement = document.getElementById("item-" + itemId);
        if (!itemElement) return;

        var qtyDisplay = itemElement.querySelector(".quantity-display");
        var subtotalElement = itemElement.querySelector(".subtotal");
        if (!qtyDisplay || !subtotalElement) return;

        var quantity = parseInt(qtyDisplay.textContent) || 0;
        if (action === "increase") quantity++;
        if (action === "decrease") quantity--;

        if (quantity <= 0) {
            itemElement.parentNode.removeChild(itemElement);
        } else {
            qtyDisplay.textContent = quantity;

            var subtotalText = subtotalElement.textContent.replace(/[^\d.]/g, '');
            var unitPrice = parseFloat(subtotalText) / (quantity - (action === "increase" ? 1 : -1) || 1);
            subtotalElement.textContent = "Subtotal: ₹" + (unitPrice * quantity).toFixed(2);
        }

        recalculateTotals();
        checkEmptyCart();
    }

    function recalculateTotals() {
        var cartItems = document.querySelectorAll(".cart-item");
        var subtotal = 0;

        for (var i = 0; i < cartItems.length; i++) {
            var subEl = cartItems[i].querySelector(".subtotal");
            if (subEl) {
                subtotal += parseFloat(subEl.textContent.replace(/[^\d.]/g, '')) || 0;
            }
        }

        var shipping = subtotal > 1000 ? 0 : 50.00;
        var tax = 50.00;
        var total = subtotal + shipping + tax;

        var summarySubtotal = document.getElementById("summary-subtotal");
        var summaryTotal = document.getElementById("summary-total");
        var summaryShipping = document.getElementById("summary-shipping");
        var summaryTax = document.getElementById("summary-tax");
        var summaryItemCount = document.getElementById("summary-item-count");

        if (summarySubtotal) summarySubtotal.textContent = "₹" + subtotal.toFixed(2);
        if (summaryShipping) summaryShipping.textContent = "₹" + shipping.toFixed(2);
        if (summaryTax) summaryTax.textContent = "₹" + tax.toFixed(2);
        if (summaryTotal) summaryTotal.textContent = "₹" + total.toFixed(2);
        if (summaryItemCount) summaryItemCount.textContent = "Subtotal (" + cartItems.length + " items)";
    }

    function checkEmptyCart() {
        var cartItems = document.querySelectorAll(".cart-item");
        if (cartItems.length === 0) {
            var emptyMessage = document.querySelector(".empty-cart-message");
            if (emptyMessage) emptyMessage.style.display = "block";

            var grandTotal = document.getElementById("grand-total-section");
            if (grandTotal) grandTotal.style.display = "none";
        }
    }
});
