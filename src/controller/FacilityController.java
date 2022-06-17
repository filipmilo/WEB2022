package controller;

import com.google.gson.Gson;

import service.FacilityService;
import util.GsonSerializer;
import static spark.Spark.get;

public class FacilityController {
	
	private static Gson g = GsonSerializer.makeGson();
	private static FacilityService facilityService = new FacilityService();
	
	public static void getAll() {
		get("rest/facilities/", (req, res) -> {
			res.type("application/json");
			return g.toJson(facilityService.getFacilities());
		});
	}
}
