package storage;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;
import java.util.HashMap;
import java.util.StringTokenizer;

import model.Training;

public class TrainingStorage {
	private HashMap<String, Training> allContent = new HashMap<String, Training>();
	private File file;
	
	public TrainingStorage() {
		this("resources\\data");
	}
	
	private TrainingStorage(String path) {
		BufferedReader in = null;
		try {
			file = new File(path + "/trainings.txt");
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
		String line, name = "", type = "", facility = "", coach = "", description = "", image = "", id = "", duration = ""; 
		
		StringTokenizer st;
		
		try {
			while((line = in.readLine()) != null) {
				line = line.trim();
				if(line.equals("") || line.indexOf("#") == 0) 
					continue;
				st = new StringTokenizer(line, ";");
				while(st.hasMoreTokens()) {
					id = st.nextToken().trim();
					name = st.nextToken().trim();
					type = st.nextToken().trim();
					facility = st.nextToken().trim();
					duration = st.nextToken().trim();
					coach = st.nextToken().trim();
					description = st.nextToken().trim();
					image = st.nextToken().trim();
					
				}
				
				Training tr = new Training(name, type, facility, duration, coach, description, image);
				tr.setId(id);
				allContent.put(tr.getId(), tr);
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	private void save() {
		try {
			PrintWriter out = new PrintWriter(new FileWriter(file), true);
			
			for(Training training: allContent.values()) {
				String str = makeLine(training);
				out.println(str);
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private String makeLine(Training training) {
		StringBuilder str = new StringBuilder();
		str.append(training.getId());
		str.append(";");
		str.append(training.getName());
		str.append(";");
		str.append(training.getType());
		str.append(";");
		str.append(training.getFacility());
		str.append(";");
		str.append(training.getDuration());
		str.append(";");
		str.append(training.getCoach());
		str.append(";");
		str.append(training.getDescription());
		str.append(";");
		str.append(training.getImagePath());
		str.append(";");

		return str.toString();
	}
	
	public Collection<Training> getAll() {
		return allContent.values();
	}
	
	public Training addTraining(Training training) {
		allContent.put(training.getId(), training);
		save();
		return training;
	}
	
	public Training getById(String id) {
		return allContent.get(id);
	}
	
}
