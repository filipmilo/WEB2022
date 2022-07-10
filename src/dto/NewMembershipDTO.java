package dto;

import java.time.LocalDate;

public class NewMembershipDTO {
	
	private String type;
	private String dateOfPayment;
	private String dateOfExpiration;
	private int fee;
	private String customer;
	private boolean status;
	private int dailyLimit;
	
	public NewMembershipDTO(String type, String dateOfPayment, String dateOfExpiration, int fee, String customer,
			boolean status, int dailyLimit) {
		super();
		this.type = type;
		this.dateOfPayment = dateOfPayment;
		this.dateOfExpiration = dateOfExpiration;
		this.fee = fee;
		this.customer = customer;
		this.status = status;
		this.dailyLimit = dailyLimit;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDateOfPayment() {
		return dateOfPayment;
	}

	public void setDateOfPayment(String dateOfPayment) {
		this.dateOfPayment = dateOfPayment;
	}

	public String getDateOfExpiration() {
		return dateOfExpiration;
	}

	public void setDateOfExpiration(String dateOfExpiration) {
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
	
	
	
	
}
