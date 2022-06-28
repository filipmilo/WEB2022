package controller;

import com.google.gson.Gson;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import model.SportsFacility;
import service.FacilityService;
import util.Authorization;
import util.GsonSerializer;
import static spark.Spark.get;

import java.security.Key;
import java.util.ArrayList;
import java.util.HashMap;

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
			//return g.toJson(facilityService.getFacilities());
			return g.toJson(facilityService.getFacilitiesArrayList());
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
}
