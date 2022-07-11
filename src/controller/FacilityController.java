package controller;

import static spark.Spark.get;
import static spark.Spark.post;

import java.util.ArrayList;

import com.google.gson.Gson;

import dto.ContentDTO;
import dto.NewFacilityDTO;
import model.SportsFacility;
import model.Training;
import service.FacilityService;
import service.TrainingService;
import util.Authorization;
import util.GsonSerializer;

public class FacilityController {
	
	private static Gson g = GsonSerializer.makeGson();
	public static FacilityService facilityService = new FacilityService();
	private static TrainingService trainingService = new TrainingService();

	public static void getAll() {
		get("rest/facilities/", (req, res) -> {
			res.type("application/json");
			return g.toJson(facilityService.getFacilitiesArrayList());
		});
	}
	
	public static void getFacilityById() {
		get("rest/facilities/getById/", (req, res) -> {
			res.type("application/json");
			return g.toJson(facilityService.getFacilityById(req.queryParams("id")));
		});
	}
	
	public static void searchFacilities() {
		get("rest/facilities/search/", (req, res) -> {
			res.type("application/json");
			String filter = req.queryParams("filter");
			
			ArrayList<SportsFacility> facilities = facilityService.getFacilitiesArrayList();
			String[] filters = filter.split(",");
			
			for(int i = 0; i < filters.length; ++i)
			{
				if(filters[i].equals(""))
					continue;
				
				facilities = facilityService.getFacilitiesBySearch(filters[i], facilities, i);
			}
			
			return g.toJson(facilities);
		});
	}
	
	public static void newFacility() {
		post("rest/facilities/new/", (req, res) -> {
			res.type("application/json");
			
			String jwt = req.headers("Authorization");
			if(!Authorization.isLoggedIn(UserController.key, jwt))
				return "null";
			
			NewFacilityDTO processDto = g.fromJson(req.body(), NewFacilityDTO.class);
			
			SportsFacility facility = new SportsFacility(processDto.getName(), processDto.getType(), "nothing", true, processDto.getLogoPath(), 0.0, "08:00-23:00", processDto.getLocation());
			facility = facilityService.newFacility(facility);
			
			if(processDto.getManager() != "") {
				UserController.userService.addFacilityToManager(processDto.getManager(), facility);
			}
			
			return facility;
		});
	}
	
	public static void getAllFacilityTypes() {
		get("rest/facilities/types/", (req, res) -> {
			res.type("application/json");
			return g.toJson(facilityService.getAllTypes());
		});
	}
	
	public static void addContent() {
		post("rest/facilities/newcontent/", (req, res) -> {
			res.type("application/json");
			System.out.println(req.body());
			
			String jwt = req.headers("Authorization");
			if(!Authorization.isLoggedIn(UserController.key, jwt))
				return "null";
			
			ContentDTO newContent = g.fromJson(req.body(), ContentDTO.class);
			
			Training training = new Training(newContent.getName(), newContent.getType(), newContent.getFacilityId(), newContent.getDuration(), newContent.getCoach(), newContent.getDescription(), newContent.getImage());
			training.setDate(newContent.getDate());
			
			training = trainingService.addContent(training);
			if(training != null)
				facilityService.addContentToFacility(training.getId(), newContent.getFacilityId());
			
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
			
//			System.out.println(content);
			
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
			
			facilityService.removeContent(facilityId, trainingId);
					
			return g.toJson(trainingService.cancelTraining(trainingId));
			
		});
		
	}
}
