package service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.StringTokenizer;

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
	
	public SportsFacility getFacilityById(String id) {
		return facilities.getById(id);
	}
	
	public void removeContent(String facilityId, String trainingId) {
		SportsFacility facility = facilities.getById(facilityId);
		
		StringTokenizer st = new StringTokenizer(facility.getContent(), ",");
		StringBuilder str = new StringBuilder();
		int i = 0;
		while(st.hasMoreTokens()) {
			String content = st.nextToken().trim();
			i++;
			if(!content.equals(trainingId)) {
				str.append(content);
				
				if(st.hasMoreTokens()) {
					str.append(",");
				}
			}
		}
		
		if(i == 1) str.append("nothing");
		facility.setContent(str.toString());
		
		facilities.editFacility(facility);
	}
	
	public SportsFacility newFacility(SportsFacility facility) {
		
		int id = 0;
		for(SportsFacility fac: facilities.getArray()) {
			if(Integer.parseInt(fac.getId()) > id) {
				id++;
			}
		}
		
		facility.setId(Integer.toString(++id));
		
		return facilities.addFacility(facility);
	}
	
	public void addContentToFacility(String trainingId, String facilityId) {
		SportsFacility facility = facilities.getById(facilityId);
		
		if(facility.getContent().equals("nothing")) {
			facility.setContent(trainingId);
		} else {
			StringBuilder str = new StringBuilder();
			str.append(facility.getContent());
			str.append(",");
			str.append(trainingId);
			
			facility.setContent(str.toString());
		}
		
		facilities.editFacility(facility);
		
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
	
	public ArrayList<String> getAllTypes() {
		ArrayList<String> types = new ArrayList<String>();
		types.add("");
		for(SportsFacility sf: facilities.getAll()) {
			if(!types.contains(sf.getType())) {
				types.add(sf.getType());
			}
		}
		return types;
	}
}
