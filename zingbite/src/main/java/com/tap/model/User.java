package com.tap.model;

import java.util.Date;

public class User {
	private int userID;
	private String userName;
	private String email;
	private String password;
	private long phoneNumber;
	private Date createdOn;
	private Date lastLogin;
	
	public User() {
		super();
	}

	public User(String userName, String email, String password, long phoneNumber, Date createdOn, Date lastLogin) {
		super();
		this.userName = userName;
		this.email = email;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.createdOn = createdOn;
		this.lastLogin = lastLogin;
	}

	public User(int userID, String userName, String email, String password, long phoneNumber, Date createdOn,
			Date lastLogin) {
		super();
		this.userID = userID;
		this.userName = userName;
		this.email = email;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.createdOn = createdOn;
		this.lastLogin = lastLogin;
	}

	@Override
	public String toString() {
		return "User [userID=" + userID + ", userName=" + userName + ", email=" + email + ", password=" + password
				+ ", phoneNumber=" + phoneNumber + ", createdOn=" + createdOn + ", lastLogin=" + lastLogin + "]";
	}
	
	
}
