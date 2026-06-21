package com.app.zingbitemodels;

public class RiderLocation {
    private int orderId;
    private int riderId;
    private double latitude;
    private double longitude;
    private double bearing; // Direction angle for marker rotation
    private String status; // OUT_FOR_DELIVERY, ARRIVED, etc.
    private double etaMinutes;

    public RiderLocation() {
    }

    public RiderLocation(int orderId, int riderId, double latitude, double longitude, double bearing, String status, double etaMinutes) {
        this.orderId = orderId;
        this.riderId = riderId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.bearing = bearing;
        this.status = status;
        this.etaMinutes = etaMinutes;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getRiderId() {
        return riderId;
    }

    public void setRiderId(int riderId) {
        this.riderId = riderId;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getBearing() {
        return bearing;
    }

    public void setBearing(double bearing) {
        this.bearing = bearing;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getEtaMinutes() {
        return etaMinutes;
    }

    public void setEtaMinutes(double etaMinutes) {
        this.etaMinutes = etaMinutes;
    }
}
