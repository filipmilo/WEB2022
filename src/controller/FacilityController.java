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
	
	public static void searchFacilities() {
		get("rest/facilities/search/", (req, res) -> {
			res.type("application/json");
			String search = req.queryParams("search");
			String filter = req.queryParams("filter");
			System.out.println(search);
			System.out.println(filter);
			return g.toJson(facilityService.getFacilitiesBySearch(search, filter));
		});
	}
}
