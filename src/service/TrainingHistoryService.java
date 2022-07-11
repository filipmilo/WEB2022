package service;

import java.util.ArrayList;

import model.Membership;
import model.Training;
import model.TrainingHistory;
import storage.MembershipStorage;
import storage.TrainingHistoryStorage;

public class TrainingHistoryService {
	private TrainingHistoryStorage trainingHistories = new TrainingHistoryStorage();
	
	public ArrayList<TrainingHistory> getTrainingHistoryArray() {
		return trainingHistories.getArray();
	}
	
	public TrainingHistory newTrainingHistory(TrainingHistory trainingHistory) {
		int id = 0;
		
		for(TrainingHistory th: trainingHistories.getArray()) {
			if(Integer.parseInt(th.getId()) > id) {
				id++;
			}
		}
		
		trainingHistory.setId(Integer.toString(++id));
		
		return trainingHistories.addTrainingHistory(trainingHistory);
	}
	
	public ArrayList<TrainingHistory> getByCoach(String coach) {
		ArrayList<TrainingHistory> trainingsC = new ArrayList<TrainingHistory>();
		
		for(TrainingHistory tr: trainingHistories.getAll()) {
			if(tr.isDeleted()) 
				continue;
			
			if(tr.getCoach().equals(coach)) 
				trainingsC.add(tr);
		}
		
		return trainingsC;
	}
}
