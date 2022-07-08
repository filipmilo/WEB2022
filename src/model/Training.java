package model;

public class Training {

	private boolean deleted;
	
	private String id;
	
	private String name;
	private String type;
	private String facility;
	private int duration;
	private String coach;
	private String description;
	private String imagePath; 
	

	public Training(String name, String type, String facility, String duration, String coach,
			String description, String imagePath) {
		super();
		this.deleted = false;
		this.name = name;
		this.type = type;
		this.facility = facility;
		try {
			this.duration = Integer.parseInt(duration);
			
		} catch(NumberFormatException e) {
			this.duration = 0;
		}
		this.coach = coach;
		this.description = description;
		this.imagePath = imagePath;
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
	public String getFacility() {
		return facility;
	}
	public void setFacility(String facility) {
		this.facility = facility;
	}
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}
	public String getCoach() {
		return coach;
	}
	public void setCoach(String coach) {
		this.coach = coach;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	
	
}
