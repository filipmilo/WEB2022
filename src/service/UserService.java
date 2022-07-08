package service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;

import model.SportsFacility;
import model.User;
import storage.UserStorage;

public class UserService {
	private UserStorage users = new UserStorage();
	
	public Collection<User> getUsers() {
		return users.getAll();
	}
	
	public User getUser(String username, String password) {
		User user = users.getUser(username);
		if(user == null)
			return null;
		
		if(user.getPassword().equals(password))
			return user;
		else
			return null;
	}
	
	public User getUser(String username) {
		User user = users.getUser(username);
		if(user == null)
			return null;
		
		return user;
	}
	
	public boolean addUser(User user) {
		if(users.getUser(user.getUsername()) == null) 
			return users.addUser(user);
		else 
			return false;
		
	}
	
	public boolean addFacilityToManager(String username, SportsFacility facility) {
		User user = users.getUser(username);
		if(user == null)
			return false;
		
		user.setFacility(facility.getId());
		
		return users.addUser(user);
	}
	
	public ArrayList<User> getAllAvailableManagers() {
		ArrayList<User> managers = new ArrayList<User>();
		
		for(User u: users.getAll()) 
			if(u.getRoleStr().equals("MANAGER") && u.getFacility().equals("null")) {
				managers.add(u);
			}
		
		return managers;
	}
	
	public ArrayList<User> getAllCoaches() {
		ArrayList<User> coaches = new ArrayList<User>();
		
		for(User u: users.getAll()) 
			if(u.getRoleStr().equals("COACH")) {
				coaches.add(u);
			}
		
		return coaches;
	}
	
	public User editUser(String username, String changes) {
		
		for(User user: users.getAll())
			if(user.getUsername().equals(username))
				users.removeUser(user);
		
		String[] changedValues = changes.split(",");
		User user = users.getUser(username);
		
		user.setPassword(changedValues[0]);
		user.setName(changedValues[1]);
		user.setSurname(changedValues[2]);
		user.setGender(changedValues[3]);
		user.setDateOfBirth(LocalDate.parse(changedValues[4]));
//		user.setRole();
		
		users.addUser(user);
		return user;
	}
	
	public String getManagerFacility(String username) {
		return users.getUser(username).getFacility();
	}
	
}
