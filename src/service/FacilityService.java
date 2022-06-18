package service;

import java.util.Collection;
import java.util.HashMap;

import model.SportsFacility;
import storage.FacilityStorage;

public class FacilityService {
	private FacilityStorage facilities = new FacilityStorage();
	
	public Collection<SportsFacility> getFacilities() {
		return facilities.getAll();
	}
	
	public Collection<SportsFacility> getFacilitiesBySearch(String search, String filter) {
		HashMap<String, SportsFacility> allFacilities = facilities.getHashMap();
		HashMap<String, SportsFacility> filteredFacilities = new HashMap<String, SportsFacility>();
		
		search = search.toLowerCase();
		System.out.println(search);
		System.out.println(filter);
		
		switch(filter) {
			case "Name":
				for(SportsFacility sf: allFacilities.values())
				{
					String name = sf.getName().toLowerCase();
					if(search.equals(name))
						filteredFacilities.put(name, sf);
				}
				break;
			case "Type":
				for(SportsFacility sf: allFacilities.values())
				{
					String type = sf.getType().toLowerCase();
					if(search.equals(type))
						filteredFacilities.put(sf.getName(), sf);
				}
				break;
			case "Location":
				for(SportsFacility sf: allFacilities.values())
				{
					String location = sf.getLocation().getAddress().split(",")[1].toLowerCase();
					if(search.equals(location))
						filteredFacilities.put(sf.getName(), sf);
				}
					
				break;
			case "Rating":
				for(SportsFacility sf: allFacilities.values())
				{
					String rating = Double.toString(sf.getAvgRating());
					if(search.equals(rating))
						filteredFacilities.put(sf.getName(), sf);
				}
				break;
		}
		
		
		return filteredFacilities.values();
	}
}
