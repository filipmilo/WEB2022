package model;

import java.time.LocalDate;
import java.util.ArrayList;

enum Gender {
	  MALE,
	  FEMALE
}

enum Role {
	ADMIN,
	MANAGER,
	COACH,
	CUSTOMER
}

public class User {
	private boolean deleted;
	private String username;
	private String password;
	private String name;
	private String surname;
	private Gender gender;
	private LocalDate dateOfBirth;
	private Role role;
	
	//List of past trainings
	private ArrayList<TrainingHistory> pastTrainings;
	
	//Membership
	private Membership membership;
	
	//Sport object manager
	private SportsFacility facility;
	
	//Visited Sport object customer
	private ArrayList<SportsFacility> visitedFacilities;
	
	//points if customer
	private int points;
	
	//type of customer
	private CustomerType customerType;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public ArrayList<TrainingHistory> getPastTrainings() {
		return pastTrainings;
	}

	public void setPastTrainings(ArrayList<TrainingHistory> pastTrainings) {
		this.pastTrainings = pastTrainings;
	}

	public Membership getMembership() {
		return membership;
	}

	public void setMembership(Membership membership) {
		this.membership = membership;
	}

	public SportsFacility getFacility() {
		return facility;
	}

	public void setFacility(SportsFacility facility) {
		this.facility = facility;
	}

	public ArrayList<SportsFacility> getVisitedFacilities() {
		return visitedFacilities;
	}

	public void setVisitedFacilities(ArrayList<SportsFacility> visitedFacilities) {
		this.visitedFacilities = visitedFacilities;
	}

	public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}

	public CustomerType getCustomerType() {
		return customerType;
	}

	public void setCustomerType(CustomerType customerType) {
		this.customerType = customerType;
	}
	
	
	
}
