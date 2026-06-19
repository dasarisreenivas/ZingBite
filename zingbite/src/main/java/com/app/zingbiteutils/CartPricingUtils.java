package com.app.zingbiteutils;

import java.util.Locale;

public final class CartPricingUtils {
    private static final double SHIPPING_FEE = 50.0;
    private static final double TAX_FEE = 50.0;
    private static final double FREE_SHIPPING_SUBTOTAL = 1000.0;

    private CartPricingUtils() {}

    public static Coupon validateCoupon(String rawCode) {
        String code = normalizeCode(rawCode);
        switch (code) {
            case "ZING50":
                return new Coupon(true, code, "percent", 50.0, 150.0, "50% OFF up to \u20B9150", null);
            case "FREEDEL":
                return new Coupon(true, code, "free_delivery", 0.0, 0.0, "Free Delivery Applied", null);
            case "WELCOME20":
                return new Coupon(true, code, "flat", 20.0, 0.0, "Flat \u20B920 OFF", null);
            default:
                return new Coupon(false, code, "", 0.0, 0.0, "", "Invalid Coupon Code");
        }
    }

    public static Totals calculateTotals(double subtotal, String rawCouponCode) {
        if (!Double.isFinite(subtotal)) {
            throw new IllegalArgumentException("Subtotal must be a finite amount");
        }
        double normalizedSubtotal = Math.max(0.0, subtotal);
        double shipping = normalizedSubtotal == 0.0 || normalizedSubtotal >= FREE_SHIPPING_SUBTOTAL ? 0.0 : SHIPPING_FEE;
        double tax = normalizedSubtotal == 0.0 ? 0.0 : TAX_FEE;
        double discount = 0.0;
        Coupon coupon = validateCoupon(rawCouponCode);

        if (coupon.valid) {
            if ("percent".equals(coupon.type)) {
                discount = normalizedSubtotal * coupon.value / 100.0;
                if (coupon.cap > 0.0) {
                    discount = Math.min(discount, coupon.cap);
                }
            } else if ("flat".equals(coupon.type)) {
                discount = Math.min(coupon.value, normalizedSubtotal);
            } else if ("free_delivery".equals(coupon.type)) {
                discount = shipping;
            }
        }

        double total = Math.max(0.0, normalizedSubtotal + shipping + tax - discount);
        return new Totals(normalizedSubtotal, shipping, tax, discount, total, coupon.valid ? coupon : null);
    }

    private static String normalizeCode(String rawCode) {
        return rawCode == null ? "" : rawCode.trim().toUpperCase(Locale.ROOT);
    }

    public static final class Coupon {
        public final boolean valid;
        public final String code;
        public final String type;
        public final double value;
        public final double cap;
        public final String description;
        public final String message;

        private Coupon(boolean valid, String code, String type, double value, double cap, String description, String message) {
            this.valid = valid;
            this.code = code;
            this.type = type;
            this.value = value;
            this.cap = cap;
            this.description = description;
            this.message = message;
        }
    }

    public static final class Totals {
        public final double subtotal;
        public final double shipping;
        public final double tax;
        public final double discount;
        public final double total;
        public final Coupon coupon;

        private Totals(double subtotal, double shipping, double tax, double discount, double total, Coupon coupon) {
            this.subtotal = subtotal;
            this.shipping = shipping;
            this.tax = tax;
            this.discount = discount;
            this.total = total;
            this.coupon = coupon;
        }
    }
}
