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

import model.Comment;
import model.TrainingHistory;

public class CommentsStorage {
	private HashMap<String, Comment> allComments = new HashMap<String, Comment>();
	private File file;
	
	public CommentsStorage() {
		this("resources\\data");
	}
	
	private CommentsStorage(String path) {
		BufferedReader in = null;
		try {
			file = new File(path + "/trainingHistory.txt");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			readAllContent(in);
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
	
	private void readAllContent(BufferedReader in) {
		String line, id = "", status = "", customer = "", facility = "", deleted = "", content = ""; 
		int rating = 0;
		StringTokenizer st;
		
		try {
			while((line = in.readLine()) != null) {
				line = line.trim();
				if(line.equals("") || line.indexOf("#") == 0) 
					continue;
				st = new StringTokenizer(line, ";");
				while(st.hasMoreTokens()) {
					id = st.nextToken().trim();
					status = st.nextToken().trim();
					customer = st.nextToken().trim();
					facility = st.nextToken().trim();
					content = st.nextToken().trim();
					rating = Integer.parseInt(st.nextToken().trim());
					deleted = st.nextToken().trim();
					
				}
				
				Comment c = new Comment(customer, facility, content, rating);
				c.setStatus(status);
				c.setId(id);
				c.setDeleted(Boolean.parseBoolean(deleted));
				
				allComments.put(c.getId(), c);
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	private void save() {
		try {
			PrintWriter out = new PrintWriter(new FileWriter(file), true);
			
			for(Comment c: allComments.values()) {
				String str = makeLine(c);
				out.println(str);
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private String makeLine(Comment c) {
		StringBuilder str = new StringBuilder();
		str.append(c.getId());
		str.append(";");
		str.append(c.getStatus());
		str.append(";");
		str.append(c.getCustomer());
		str.append(";");
		str.append(c.getFacility());
		str.append(";");
		str.append(c.getContent());
		str.append(";");
		str.append(c.getRating());
		str.append(";");
		str.append(c.isDeleted());	

		return str.toString();
	}
	
	public Collection<Comment> getAll() {
		return allComments.values();
	}
	
	public Comment getById(String id) {
		return allComments.get(id);
	}
	
	public Comment addTrainingHistory(Comment c) {
		allComments.put(c.getId(), c);
		save();
		return c;
	}
}
