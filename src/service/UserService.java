package service;

import java.util.Collection;

import model.User;
import storage.UserStorage;

public class UserService {
	private UserStorage users = new UserStorage();
	
	public Collection<User> getUsers() {
		return users.getAll();
	}
	
	public User getUser(String username) {
		return users.getUser(username);
	}
	
	public boolean addUser(User user) {
		if(users.getUser(user.getUsername()) == null) 
			return users.addUser(user);
		else 
			return false;
		
	}
	
}
