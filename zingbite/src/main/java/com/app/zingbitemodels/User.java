package com.app.zingbitemodels;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="")
public class User implements Serializable{
	
	private static final long serialVersionUID = 1L;
	@Column(name="")
	private int userID;
	@Column(name="")
	private String userName;
	@Column(name="")
	private String email;
	@Column(name="")
	private String password;
	@Column(name="")
	private long phoneNumber;
	@Column(name="")
	private String address;
	@Column(name="")
	private Date createdOn;
	@Column(name="")
	private Date lastLogin;
	
	
	public User() {
		super();
	}
	
	public User(String userName, String email, String password, long phoneNumber,String address) {
		super();
		this.userName = userName;
		this.email = email;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.address = address;
	}

	public User(int userID, String userName, String email, String password, long phoneNumber, String address) {
		super();
		this.userID = userID;
		this.userName = userName;
		this.email = email;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.address = address;
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

	@Override
	public String toString() {
		return "User [userID=" + userID + ", userName=" + userName + ", email=" + email + ", password=" + password
				+ ", phoneNumber=" + phoneNumber + ", createdOn=" + createdOn + ", lastLogin=" + lastLogin + "]";
	}
	
	
}
