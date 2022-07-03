package service;

import java.util.Collection;

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
	
	public User editUser(String username, String changes) {
		
		for(User user: users.getAll())
			if(user.getUsername().equals(username))
				users.removeUser(user);
		
		String[] changedValues = changes.split(",");
		User user = users.getUser(username);
		
		user.setPassword(changedValues[0]);
		user.setName(changedValues[1]);
		user.setSurname(changedValues[2]);
//		user.setGender();
//		user.setDateOfBirth();
//		user.setRole();
		
		users.addUser(user);
		return user;
	}
	
}
