package service;

import java.util.ArrayList;
import java.util.StringTokenizer;

import model.Training;
import storage.TrainingStorage;

public class TrainingService {
	private TrainingStorage trainings = new TrainingStorage();
	
	public Training addContent(Training training) {
		//add function to training
		int id = 0;
		for(Training tr: trainings.getAll()) {
			if(tr.getName() == training.getName() && tr.getFacility() == training.getFacility()) return null;
			
			if(Integer.parseInt(tr.getId()) > id) {
				id++;
			}
			
		}
		
		training.setId(Integer.toString(++id));
		return trainings.addTraining(training);
		
	}
	
	public ArrayList<Training> getAllContent(String parse) {
		ArrayList<Training> content = new ArrayList<Training>();
		
		StringTokenizer st = new StringTokenizer(parse, ",");
		
		while(st.hasMoreTokens()) {
			content.add(trainings.getById(st.nextToken().trim()));
		}
	
		return content;
	}
}
