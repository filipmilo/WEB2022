package dto;

import model.Location;

public class NewFacilityDTO {
	
	private String name;
	private String type;
	private String content;
	private boolean status;
	private Location location;
	private String logoPath;
	private String workingHours;
	
	private String manager;
	
	public NewFacilityDTO(String name, String type, String content, boolean status, Location location, String logoPath,
			String workingHours, String manager) {
		super();
		this.name = name;
		this.type = type;
		this.content = content;
		this.status = status;
		this.location = location;
		this.logoPath = logoPath;
		this.workingHours = workingHours;
		this.manager = manager;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public String getLogoPath() {
		return logoPath;
	}

	public void setLogoPath(String logoPath) {
		this.logoPath = logoPath;
	}

	public String getWorkingHours() {
		return workingHours;
	}

	public void setWorkingHours(String workingHours) {
		this.workingHours = workingHours;
	}

	public String getManager() {
		return manager;
	}

	public void setManager(String manager) {
		this.manager = manager;
	}
	
	
}
