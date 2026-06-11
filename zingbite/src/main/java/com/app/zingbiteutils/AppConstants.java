package com.app.zingbiteutils;

public class AppConstants {
    
    public static class Role {
        public static final String CUSTOMER = "customer";
        public static final String DELIVERY_PARTNER = "delivery_partner";
        public static final String RESTAURANT_ADMIN = "restaurant_admin";
        public static final String SUPER_ADMIN = "super_admin";
    }

    public static class OrderStatusValue {
        public static final String PLACED = "PLACED";
        public static final String ACCEPTED = "ACCEPTED";
        public static final String PREPARING = "PREPARING";
        public static final String READY_FOR_PICKUP = "READY_FOR_PICKUP";
        public static final String PICKED_UP = "PICKED_UP";
        public static final String OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY";
        public static final String DELIVERED = "DELIVERED";
    }

    public static class ApplicationStatus {
        public static final String APPLIED = "Applied";
        public static final String INTERVIEW = "Interview";
        public static final String OFFER_EXTENDED = "Offer Extended";
        public static final String OFFERED = "Offered";
        public static final String ACCEPTED = "Accepted";
        public static final String REJECTED = "Rejected";
    }

    public static class RestaurantRequestStatus {
        public static final String PENDING = "Pending";
        public static final String APPROVED = "Approved";
        public static final String REJECTED = "Rejected";
    }

    public static class RiderStatus {
        public static final String PENDING = "Pending";
        public static final String ACTIVE = "Active";
        public static final String INACTIVE = "Inactive";
    }

    public static class EmailStatus {
        public static final String PENDING = "PENDING";
        public static final String SENT = "SENT";
        public static final String FAILED = "FAILED";
        public static final String DISABLED = "DISABLED";
    }

    public static class Pagination {
        public static final int DEFAULT_PAGE_SIZE = 20;
        public static final int MAX_PAGE_SIZE = 100;
    }

    public static class Validation {
        public static final String FSSAI_PATTERN = "^\\d{14}$";
        public static final String AADHAAR_PATTERN = "^\\d{12}$";
        public static final String GSTIN_PATTERN = "^\\d{2}[A-Z]{5}\\d{4}[A-Z]{1}[A-Z\\d]{1}[Z]{1}[A-Z\\d]{1}$";
        public static final double MIN_LATITUDE = -90.0;
        public static final double MAX_LATITUDE = 90.0;
        public static final double MIN_LONGITUDE = -180.0;
        public static final double MAX_LONGITUDE = 180.0;
    }
}