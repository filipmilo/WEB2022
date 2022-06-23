package controller;

import com.google.gson.Gson;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import service.FacilityService;
import util.Authorization;
import util.GsonSerializer;
import static spark.Spark.get;

import java.security.Key;

public class FacilityController {
	
	private static Gson g = GsonSerializer.makeGson();
	private static FacilityService facilityService = new FacilityService();
	
	private static Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	
	public static void getAll() {
		get("rest/facilities/", (req, res) -> {
			res.type("application/json");
			/*if(Authorization.isLoggedIn(key, req.headers("Authorization"))) {
				return g.toJson(facilityService.getFacilities());
			}
			else return g.toJson(null);*/
			return g.toJson(facilityService.getFacilities());
		});
	}
	
	public static void searchFacilities() {
		get("rest/facilities/search/", (req, res) -> {
			res.type("application/json");
			String search = req.queryParams("search");
			String filter = req.queryParams("filter");
			
			return g.toJson(facilityService.getFacilitiesBySearch(search, filter));
		});
	}
}
