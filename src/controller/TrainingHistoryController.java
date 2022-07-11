package controller;

import static spark.Spark.post;

import java.time.LocalDate;

import static spark.Spark.get;

import com.google.gson.Gson;

import dto.ContentDTO;
import dto.NewMembershipDTO;
import dto.NewTrainingHistoryDTO;
import model.Membership;
import model.Training;
import model.TrainingHistory;
import service.TrainingHistoryService;
import service.TrainingService;
import util.Authorization;
import util.GsonSerializer;

public class TrainingHistoryController {
	private static Gson g = GsonSerializer.makeGson();
	
	private static TrainingHistoryService trainingHistoryService = new TrainingHistoryService();
	
	public static void getAll() {
		get("rest/trainingHistory/", (req, res) -> {
			res.type("application/json");
			
			return g.toJson(trainingHistoryService.getTrainingHistoryArray());
		});
	}
	
	public static void getCoachTrainings() {
		get("rest/trainingHistory/coachtrainings/", (req, res) -> {
			res.type("application/json");
			 
			String jwt = req.headers("Authorization");
			if(!Authorization.isLoggedIn(UserController.key, jwt))
				return "null";
			
			return g.toJson(trainingHistoryService.getByCoach(req.queryParams("username")));
		});
	}
	
	public static void addTrainingHistory() {
		post("rest/trainingHistory/new/", (req, res) -> {
			res.type("application/json");
			
//			String jwt = req.headers("Authorization");
//			if(!Authorization.isLoggedIn(UserController.key, jwt))
//				return "null";
			
			NewTrainingHistoryDTO processDto = g.fromJson(req.body(), NewTrainingHistoryDTO.class);
			
			TrainingHistory trainingHistory = new TrainingHistory(LocalDate.parse(processDto.getApplicationDate()), processDto.getTraining(), 
					processDto.getCustomer(), processDto.getCoach());
			
			trainingHistory = trainingHistoryService.newTrainingHistory(trainingHistory);
			
			return trainingHistory;
		});
	}
}
