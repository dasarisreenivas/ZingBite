package com.app.zingbitemodels;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "restaurant_requests")
public class RestaurantRequest implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "restaurantName")
    private String restaurantName;

    @Column(name = "cuisineType")
    private String cuisineType;

    @Column(name = "address")
    private String address;

    @Column(name = "deliveryTime")
    private String deliveryTime;

    @Column(name = "imagePath")
    private String imagePath;

    @Column(name = "licenseNo")
    private String licenseNo;

    @Column(name = "aadhaarNo")
    private String aadhaarNo;

    @Column(name = "gstNo")
    private String gstNo;

    @Column(name = "status")
    private String status; // Pending, Approved, Rejected

    @Column(name = "adminId")
    private int adminId;

    @Column(name = "submittedDate")
    private String submittedDate;

    public RestaurantRequest() {
        super();
        this.status = "Pending";
        this.deliveryTime = "30 mins";
    }

    public RestaurantRequest(String restaurantName, String cuisineType, String address, String deliveryTime,
            String imagePath, String licenseNo, String aadhaarNo, String gstNo, int adminId, String submittedDate) {
        super();
        this.restaurantName = restaurantName;
        this.cuisineType = cuisineType;
        this.address = address;
        this.deliveryTime = deliveryTime != null ? deliveryTime : "30 mins";
        this.imagePath = imagePath;
        this.licenseNo = licenseNo;
        this.aadhaarNo = aadhaarNo;
        this.gstNo = gstNo;
        this.status = "Pending";
        this.adminId = adminId;
        this.submittedDate = submittedDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public String getCuisineType() {
        return cuisineType;
    }

    public void setCuisineType(String cuisineType) {
        this.cuisineType = cuisineType;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDeliveryTime() {
        return deliveryTime;
    }

    public void setDeliveryTime(String deliveryTime) {
        this.deliveryTime = deliveryTime;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getLicenseNo() {
        return licenseNo;
    }

    public void setLicenseNo(String licenseNo) {
        this.licenseNo = licenseNo;
    }

    public String getAadhaarNo() {
        return aadhaarNo;
    }

    public void setAadhaarNo(String aadhaarNo) {
        this.aadhaarNo = aadhaarNo;
    }

    public String getGstNo() {
        return gstNo;
    }

    public void setGstNo(String gstNo) {
        this.gstNo = gstNo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getAdminId() {
        return adminId;
    }

    public void setAdminId(int adminId) {
        this.adminId = adminId;
    }

    public String getSubmittedDate() {
        return submittedDate;
    }

    public void setSubmittedDate(String submittedDate) {
        this.submittedDate = submittedDate;
    }
}
