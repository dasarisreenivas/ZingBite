package com.app.zingbitemodels;

public enum OrderStatus {
    PENDING_PAYMENT,
    PLACED, 
    ACCEPTED, 
    PREPARING, 
    READY_FOR_PICKUP, 
    PICKED_UP, 
    OUT_FOR_DELIVERY, 
    DELIVERED, 
    CANCELLED;

    public boolean canTransitionTo(OrderStatus next) {
        if (this == CANCELLED || this == DELIVERED) {
            return false; // Terminal states
        }
        if (next == CANCELLED) {
            return true; // Any non-terminal state can transition to CANCELLED
        }
        switch (this) {
            case PENDING_PAYMENT:
                return next == PLACED || next == CANCELLED;
            case PLACED:
                return next == ACCEPTED;
            case ACCEPTED:
                return next == PREPARING;
            case PREPARING:
                return next == READY_FOR_PICKUP;
            case READY_FOR_PICKUP:
                return next == PICKED_UP;
            case PICKED_UP:
                return next == OUT_FOR_DELIVERY;
            case OUT_FOR_DELIVERY:
                return next == DELIVERED;
            default:
                return false;
        }
    }

    public static OrderStatus parse(String statusStr) {
        if (statusStr == null) return PLACED;
        String normalized = statusStr.trim().toUpperCase().replace(" ", "_").replace("-", "_");
        switch (normalized) {
            case "PENDING_PAYMENT":
            case "PENDING_PAY":
            case "PENDING":
                return PENDING_PAYMENT;
            case "PLACED": return PLACED;
            case "ACCEPTED": return ACCEPTED;
            case "PREPARING": return PREPARING;
            case "READY_FOR_PICKUP":
            case "WAITING_TO_DISPATCH":
            case "FOOD_READY":
                return READY_FOR_PICKUP;
            case "PICKED_UP": return PICKED_UP;
            case "OUT_FOR_DELIVERY": return OUT_FOR_DELIVERY;
            case "DELIVERED": return DELIVERED;
            case "CANCELLED": return CANCELLED;
            default:
                try {
                    return OrderStatus.valueOf(normalized);
                } catch (IllegalArgumentException e) {
                    return PLACED;
                }
        }
    }

    public String label() {
        switch (this) {
            case PENDING_PAYMENT: return "Pending Payment";
            case PLACED: return "Order Placed";
            case ACCEPTED: return "Order Accepted";
            case PREPARING: return "Preparing Food";
            case READY_FOR_PICKUP: return "Ready for Pickup";
            case PICKED_UP: return "Picked Up";
            case OUT_FOR_DELIVERY: return "Out for Delivery";
            case DELIVERED: return "Delivered";
            case CANCELLED: return "Cancelled";
            default: return name();
        }
    }
}
