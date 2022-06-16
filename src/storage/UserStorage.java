package storage;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Collection;
import java.util.HashMap;
import java.util.StringTokenizer;

import model.User;

public class UserStorage {
	
	private HashMap<String, User> allUsers = new HashMap<String, User>();
	
	public UserStorage() {
		this(".");
	}
	
	public UserStorage(String path) {
		BufferedReader in = null;
		try {
			File file = new File(path + "/users.txt");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			readAllUsers(in);
		} catch(IOException e) {
			e.printStackTrace();
		} finally {
			if(in != null) {
				try {
					in.close();
				} catch (Exception e){}
			}
		}
	}
	
	private void readAllUsers(BufferedReader in) {
		String line, username = "", password = "", name = "", surname = "", gender = "", dateOfBirth = "", role = "";
		StringTokenizer st;
		
		try {
			while((line = in.readLine()) != null) {
				line = line.trim();
				if(line.equals("") || line.indexOf("#") == 0) 
					continue;
				st = new StringTokenizer(line, ";");
				while(st.hasMoreTokens()) {
					username = st.nextToken().trim();
					password = st.nextToken().trim();
					name = st.nextToken().trim();
					surname = st.nextToken().trim();
					gender = st.nextToken().trim();
					dateOfBirth = st.nextToken().trim();
					role = st.nextToken().trim();
				}
				
				User user = new User(username, password, name, surname, gender, LocalDate.parse(dateOfBirth), role);
				allUsers.put(username, user); 
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public Collection<User> getAll() {
		return allUsers.values();
	}
	
	public User getUser(String username) {
		return allUsers.get(username);
	}
	
	public boolean addUser(User user) {
		allUsers.put(user.getUsername(), user);
		return true;
	}
}
