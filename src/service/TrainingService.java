package service;

import model.Training;
import storage.TrainingStorage;

public class TrainingService {
	private TrainingStorage trainings = new TrainingStorage();
	
	public Training addContent(Training training) {
		//add function to training
		int id = 0;
		for(Training tr: trainings.getAll()) {
			if(tr.getName() == training.getName()) return null;
			
			if(Integer.parseInt(tr.getId()) > id) {
				id++;
			}
			
		}
		
		training.setId(Integer.toString(++id));
		return trainings.addTraining(training);
		
	}
}
