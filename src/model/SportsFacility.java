package model;


public class SportsFacility {

	private boolean deleted;
	
	private String name;
	private String type;
	private String content;
	private boolean status;
	private Location location;
	private String logoPath;
	private double avgRating;
	private String workingHours;
	
	
	
	
	public SportsFacility(String name, String type, String content, boolean status, String logoPath, double avgRating,
			String workingHours, double longitude, double latitude, String address) {
		super();
		this.name = name;
		this.type = type;
		this.content = content;
		this.status = status;
		this.logoPath = logoPath;
		this.avgRating = avgRating;
		this.workingHours = workingHours;
		this.location = new Location(longitude, latitude, address);
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
	public double getAvgRating() {
		return avgRating;
	}
	public void setAvgRating(double avgRating) {
		this.avgRating = avgRating;
	}
	public String getWorkingHours() {
		return workingHours;
	}
	public void setWorkingHours(String workingHours) {
		this.workingHours = workingHours;
	}
	
	
}
