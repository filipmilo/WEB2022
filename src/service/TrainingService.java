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
			if(tr.getName().equals(training.getName()) && tr.getFacility().equals(training.getFacility())) return null;
			
			if(Integer.parseInt(tr.getId()) > id) {
				id++;
			}
			
		}
		
		training.setId(Integer.toString(++id));
		return trainings.addTraining(training);
		
	}
	
	public Training getTrainingById(String id) {
		return trainings.getById(id);
	}
	
	public Training cancelTraining(String trainingId) {
		Training training = trainings.getById(trainingId);
		training.setDeleted(true);
		
		trainings.addTraining(training);
		
		return training;
	}
	
	public Training editContent(Training training) {
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
	
	public ArrayList<Training> getByCoach(String coach) {
		ArrayList<Training> trainingsC = new ArrayList<Training>();
		
		for(Training tr: trainings.getAll()) {
			if(tr.isDeleted()) 
				continue;
			
			if(tr.getCoach().equals(coach)) 
				trainingsC.add(tr);
		}
		
		return trainingsC;
	}
}
