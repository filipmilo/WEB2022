package controller;

import static spark.Spark.get;
import static spark.Spark.post;

import com.google.gson.Gson;

import dto.ContentDTO;
import model.Training;
import service.TrainingService;
import util.Authorization;
import util.GsonSerializer;

public class TrainingController {
	private static Gson g = GsonSerializer.makeGson();

	private static TrainingService trainingService = new TrainingService();
	
	public static void addContent() {
		post("rest/facilities/newcontent/", (req, res) -> {
			res.type("application/json");
			System.out.println(req.body());
			
			/*String jwt = req.headers("Authorization");
			if(!Authorization.isLoggedIn(UserController.key, jwt))
				return "null";*/
			
			ContentDTO newContent = g.fromJson(req.body(), ContentDTO.class);
			
			Training training = new Training(newContent.getName(), newContent.getType(), newContent.getFacilityId(), newContent.getDuration(), newContent.getCoach(), newContent.getDescription(), newContent.getImage());
			training.setDate(newContent.getDate());
			
			training = trainingService.addContent(training);
			if(training != null)
				FacilityController.facilityService.addContentToFacility(training.getId(), newContent.getFacilityId());
			
			return g.toJson(training);
		});
	}
	
	public static void editContent() {
		post("rest/facilities/editcontent/", (req, res) -> {
			res.type("application/json");
			System.out.println(req.body());
			
			String jwt = req.headers("Authorization");
			if(!Authorization.isLoggedIn(UserController.key, jwt))
				return "null";
			
			String trainingId = req.queryParams("id");
			
			ContentDTO newContent = g.fromJson(req.body(), ContentDTO.class);
			
			Training training = new Training(newContent.getName(), newContent.getType(), newContent.getFacilityId(), newContent.getDuration(), newContent.getCoach(), newContent.getDescription(), newContent.getImage());
			training.setId(trainingId);
			training.setDate(newContent.getDate());
			
			training = trainingService.editContent(training);
			
			return g.toJson(training);
		});
	}
	
	public static void getContent() {
		get("rest/facilities/content/", (req, res) -> {
			res.type("application/json");
			
			String content = req.queryParams("content");
			
			System.out.println(content);
			
			return g.toJson(trainingService.getAllContent(content));
		});
	}
	
	public static void getCoachTrainings() {
		get("rest/facilities/coachtrainings/", (req, res) -> {
			res.type("application/json");
			 
			String jwt = req.headers("Authorization");
			if(!Authorization.isLoggedIn(UserController.key, jwt))
				return "null";
			
			return g.toJson(trainingService.getByCoach(req.queryParams("username")));
		});
	}
	
	public static void deleteTraining() {
		post("rest/facilities/deletetraining/", (req, res) ->{
			res.type("application/json");
			
			String jwt = req.headers("Authorization");
			if(!Authorization.isLoggedIn(UserController.key, jwt))
				return "null";
			
			String trainingId = req.queryParams("trainingId");
			String facilityId = req.queryParams("facilityId");
			
			FacilityController.facilityService.removeContent(facilityId, trainingId);
					
			return g.toJson(trainingService.cancelTraining(trainingId));
			
		});
		
	}
}
