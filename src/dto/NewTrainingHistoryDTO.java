package dto;

import java.time.LocalDate;

public class NewTrainingHistoryDTO {
	private String applicationDate;
	private String training;
	private String customer;
	private String coach;
	
	public NewTrainingHistoryDTO(String applicationDate, String training, String customer, String coach) {
		super();
		this.applicationDate = applicationDate;
		this.training = training;
		this.customer = customer;
		this.coach = coach;
	}

	public String getApplicationDate() {
		return applicationDate;
	}

	public void setApplicationDate(String applicationDate) {
		this.applicationDate = applicationDate;
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
	
	
}
