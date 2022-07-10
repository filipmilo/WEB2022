package storage;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.StringTokenizer;

import model.Membership;
import model.TrainingHistory;

public class TrainingHistoryStorage {
	private HashMap<String, TrainingHistory> allTrainings = new HashMap<String, TrainingHistory>();
	private ArrayList<TrainingHistory> allTHistories = new ArrayList<TrainingHistory>();
	private File file;
	
	
	public TrainingHistoryStorage() {
		this("resources\\data");
	}
	
	private TrainingHistoryStorage(String path) {
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
		String line, id = "", training = "", customer = "", coach = "", deleted = ""; 
		String date = "";
		StringTokenizer st;
		
		try {
			while((line = in.readLine()) != null) {
				line = line.trim();
				if(line.equals("") || line.indexOf("#") == 0) 
					continue;
				st = new StringTokenizer(line, ";");
				while(st.hasMoreTokens()) {
					id = st.nextToken().trim();
					date = st.nextToken().trim();
					training = st.nextToken().trim();
					customer = st.nextToken().trim();
					coach = st.nextToken().trim();
					deleted = st.nextToken().trim();
					
				}
				
				TrainingHistory th = new TrainingHistory(LocalDate.parse(date), training, customer, coach);
				th.setId(id);
				th.setDeleted(Boolean.parseBoolean(deleted));
				
				allTHistories.add(th);
				allTrainings.put(th.getId(), th);
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	private void save() {
		try {
			PrintWriter out = new PrintWriter(new FileWriter(file), true);
			
			for(TrainingHistory training: allTrainings.values()) {
				String str = makeLine(training);
				out.println(str);
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private String makeLine(TrainingHistory training) {
		StringBuilder str = new StringBuilder();
		str.append(training.getId());
		str.append(";");
		str.append(training.getApplicationDate());
		str.append(";");
		str.append(training.getTraining());
		str.append(";");
		str.append(training.getCustomer());
		str.append(";");
		str.append(training.getCoach());
		str.append(";");
		str.append(training.isDeleted());	

		return str.toString();
	}
	
	public Collection<TrainingHistory> getAll() {
		return allTrainings.values();
	}
	
	public ArrayList<TrainingHistory> getArray() {
		return allTHistories;
	}
	
	public TrainingHistory addTrainingHistory(TrainingHistory training) {
		allTrainings.put(training.getId(), training);
		allTHistories.add(training);
		save();
		return training;
	}
	
	public TrainingHistory getById(String id) {
		return allTrainings.get(id);
	}
}
