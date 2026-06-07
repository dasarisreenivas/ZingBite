package com.app.zingbitemodels;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="user")
public class User implements Serializable{
	
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="userid")
	private int userID;
	@Column(name="USERNAME")
	private String userName;
	@Column(name="EMAIL")
	private String email;
	@Column(name="PASSWORD")
	private String password;
	@Column(name="PHONENUMBER")
	private long phoneNumber;
	@Column(name="ADDRESS")
	private String address;
	@Column(name="CREATEDON")
	private Date createdOn;
	@Column(name="LASTLOGIN")
	private Date lastLogin;
	@Column(name="role")
	private String role;
	@Column(name="latitude")
	private Double latitude;
	@Column(name="longitude")
	private Double longitude;
	@Column(name="city")
	private String city;
	@Column(name="rider_status")
	private String riderStatus;
	@Column(name="vehicle_type")
	private String vehicleType;
	
	
	public User() {
		super();
		this.role = "customer";
	}
	
	public User(String userName, String email, String password, long phoneNumber,String address) {
		super();
		this.userName = userName;
		this.email = email;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.address = address;
		this.role = "customer";
	}

	public User(int userID, String userName, String email, String password, long phoneNumber, String address) {
		super();
		this.userID = userID;
		this.userName = userName;
		this.email = email;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.address = address;
		this.role = "customer";
	}

	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public long getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(long phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Date getCreatedOn() {
		return createdOn;
	}
	
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}

	public Date getLastLogin() {
		return lastLogin;
	}

	public void setLastLogin(Date lastLogin) {
		this.lastLogin = lastLogin;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getRiderStatus() {
		return riderStatus;
	}

	public void setRiderStatus(String riderStatus) {
		this.riderStatus = riderStatus;
	}

	public String getVehicleType() {
		return vehicleType;
	}

	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}

	@Override
	public String toString() {
		return "User [userID=" + userID + ", userName=" + userName + ", email=" + email + ", password=" + password
				+ ", phoneNumber=" + phoneNumber + ", createdOn=" + createdOn + ", lastLogin=" + lastLogin + ", role=" + role 
				+ ", latitude=" + latitude + ", longitude=" + longitude + ", city=" + city + ", riderStatus=" + riderStatus + ", vehicleType=" + vehicleType + "]";
	}
	
	
}
