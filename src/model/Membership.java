package model;

import java.time.LocalDate;

public class Membership {
	private String id; //10 characters
	private String type;
	private LocalDate dateOfPayment;
	private LocalDate dateOfExpiration;
	private int fee;
	private User customer;
	private boolean status;
	private int dailyLimit;
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public LocalDate getDateOfPayment() {
		return dateOfPayment;
	}
	public void setDateOfPayment(LocalDate dateOfPayment) {
		this.dateOfPayment = dateOfPayment;
	}
	public LocalDate getDateOfExpiration() {
		return dateOfExpiration;
	}
	public void setDateOfExpiration(LocalDate dateOfExpiration) {
		this.dateOfExpiration = dateOfExpiration;
	}
	public int getFee() {
		return fee;
	}
	public void setFee(int fee) {
		this.fee = fee;
	}
	public User getCustomer() {
		return customer;
	}
	public void setCustomer(User customer) {
		this.customer = customer;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public int getDailyLimit() {
		return dailyLimit;
	}
	public void setDailyLimit(int dailyLimit) {
		this.dailyLimit = dailyLimit;
	}
	
	
}
