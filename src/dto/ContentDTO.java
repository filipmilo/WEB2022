package dto;

public class ContentDTO {
	private String name;
	private String type;
	private String duration;
	private String coach;
	private String facilityId;
	private String description;
	private String image;
	
	public ContentDTO(String name, String type, String duration, String coach, String facilityId, String description,
			String image) {
		super();
		this.name = name;
		this.type = type;
		this.duration = duration;
		this.coach = coach;
		this.facilityId = facilityId;
		this.description = description;
		this.image = image;
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

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getCoach() {
		return coach;
	}

	public void setCoach(String coach) {
		this.coach = coach;
	}

	public String getFacilityId() {
		return facilityId;
	}

	public void setFacilityId(String facilityId) {
		this.facilityId = facilityId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
	
	
}
