package model;

import java.time.LocalDate;

public class TrainingHistory {

	private boolean deleted;
	private String id;
	private LocalDate applicationDate;
	private String training;
	private String customer;
	private String coach;
	
	public TrainingHistory(LocalDate applicationDate, String training, String customer, String coach) {
		super();
		this.deleted = false;
		this.applicationDate = applicationDate;
		this.training = training;
		this.customer = customer;
		this.coach = coach;
	}
	public LocalDate getApplicationDate() {
		return applicationDate;
	}
	public void setApplicationDate(LocalDate applicationDate) {
		this.applicationDate = applicationDate;
	}
	public boolean isDeleted() {
		return deleted;
	}
	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}
	public String getTraining() {
		return training;
	}
	public void setTraining(String training) {
		this.training = training;
	}
	public String getCustomer() {
		return customer;
	}
	public void setCustomer(String customer) {
		this.customer = customer;
	}
	public String getCoach() {
		return coach;
	}
	public void setCoach(String coach) {
		this.coach = coach;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

	
	
	
}
