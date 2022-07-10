package model;

import java.time.LocalDate;

public class Membership {

	private boolean deleted;
	
	private String id; //10 characters
	private String type;
	private LocalDate dateOfPayment;
	private LocalDate dateOfExpiration;
	private int fee;
	private String customer;
	private boolean status;
	private int dailyLimit;
	private int remainingVisits;
	
	public Membership(String id, String type, LocalDate dateOfPayment, LocalDate dateOfExpiration,
			int fee, String customer, boolean status, int dailyLimit, int remainingVisits) {
		
		this.id = id;
		this.type = type;
		this.dateOfPayment = dateOfPayment;
		this.dateOfExpiration = dateOfExpiration;
		this.fee = fee;
		this.customer = customer;
		this.status = status;
		this.dailyLimit = dailyLimit;
		this.remainingVisits = remainingVisits;
	}
	
	public Membership(String type, String dateOfPayment, String dateOfExpiration,
			int fee, String customer, boolean status, int dailyLimit, int remainingVisits) {
		
		this.id = "";
		this.type = type;
		this.dateOfPayment = LocalDate.parse(dateOfPayment);
		this.dateOfExpiration = LocalDate.parse(dateOfExpiration);
		this.fee = fee;
		this.customer = customer;
		this.status = status;
		this.dailyLimit = dailyLimit;
		this.remainingVisits = remainingVisits;
	}
	
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
	public String getCustomer() {
		return customer;
	}
	public void setCustomer(String customer) {
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

	public int getRemainingVisits() {
		return remainingVisits;
	}

	public void setRemainingVisits(int remainingVisits) {
		this.remainingVisits = remainingVisits;
	}
	
	
}
