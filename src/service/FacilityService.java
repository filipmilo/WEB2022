package service;

import java.util.Collection;

import model.SportsFacility;
import storage.FacilityStorage;

public class FacilityService {
	private FacilityStorage facilities = new FacilityStorage();
	
	public Collection<SportsFacility> getFacilities() {
		return facilities.getAll();
	}
}
