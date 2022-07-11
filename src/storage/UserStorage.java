package storage;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.util.Collection;
import java.util.HashMap;
import java.util.StringTokenizer;

import model.User;

public class UserStorage {
	
	private HashMap<String, User> allUsers = new HashMap<String, User>();
	private File file;
	
	public UserStorage() {
		this("resources\\data");
	}
	
	public UserStorage(String path) {
		BufferedReader in = null;
		try {
			file = new File(path + "/users.txt");
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
		String line, username = "", password = "", name = "", surname = "", gender = "", dateOfBirth = "", 
				role = "", facility = "", trainingHistory = "";
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
					facility = st.nextToken().trim();
					trainingHistory = st.nextToken().trim();
				}
				
				User user = new User(username, password, name, surname, gender, LocalDate.parse(dateOfBirth), role, trainingHistory);
				user.setFacility(facility);
				allUsers.put(username, user); 
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	private void save() {
		try {
			PrintWriter out = new PrintWriter(new FileWriter(file), true);
			
			for(User user: allUsers.values()) {
				String str = makeLine(user);
				out.println(str);
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private String makeLine(User user) {
		
		StringBuilder str = new StringBuilder();
		str.append(user.getUsername());
		str.append(";");
		str.append(user.getPassword());
		str.append(";");
		str.append(user.getName());
		str.append(";");
		str.append(user.getSurname());
		str.append(";");
		str.append(user.getGender());
		str.append(";");
		str.append(user.getDateOfBirth());
		str.append(";");
		str.append(user.getRole());
		str.append(";");
		str.append(user.getFacility());
		str.append(";");
		str.append(user.getTrainingHistory());
		
		
		return str.toString();
	}
	
	public Collection<User> getAll() {
		return allUsers.values();
	}
	
	public User getUser(String username) {
		return allUsers.get(username);
	}
	
	public boolean addUser(User user) {
		allUsers.put(user.getUsername(), user);
		save();
		return true;
	}
	
	public boolean removeUser(User user) {
		allUsers.remove(user);
		return true;
	}
}
