package service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

import model.SportsFacility;
import storage.FacilityStorage;

public class FacilityService {
	private FacilityStorage facilities = new FacilityStorage();
	
	public Collection<SportsFacility> getFacilities() {
		return facilities.getAll();
	}
	
	public ArrayList<SportsFacility> getFacilitiesArrayList() {
		return facilities.getArray();
	}
	
	public ArrayList<SportsFacility> getFacilitiesBySearch(String filter, 
			ArrayList<SportsFacility> facilities, int i) {
		ArrayList<SportsFacility> filteredFacilities = new ArrayList<SportsFacility>();
		
		filter = filter.toLowerCase();
		
		switch(i) {
			case 0:
				for(SportsFacility sf: facilities)
				{
					String name = sf.getName().toLowerCase();
					if(filter.equals(name))
						filteredFacilities.add(sf);
				}
				break;
			case 1:
				for(SportsFacility sf: facilities)
				{
					String type = sf.getType().toLowerCase();
					if(filter.equals(type))
						filteredFacilities.add(sf);
				}
				break;
			case 2:
				for(SportsFacility sf: facilities)
				{
					String location = sf.getLocation().getAddress().split(",")[1].toLowerCase();
					location = location.substring(1);
					if(filter.equals(location))
						filteredFacilities.add(sf);
				}
					
				break;
			case 3:
				for(SportsFacility sf: facilities)
				{
					String rating = Double.toString(sf.getAvgRating());
					if(filter.equals(rating))
						filteredFacilities.add(sf);
				}
				break;
		}
		
		return filteredFacilities;
	}
}
