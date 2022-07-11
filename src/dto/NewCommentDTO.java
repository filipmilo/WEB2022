package dto;

public class NewCommentDTO {
	private String customer;
	private String facility;
	private String content;
	private int rating;
	
	public NewCommentDTO(String customer, String facility, String content, int rating) {
		super();
		this.customer = customer;
		this.facility = facility;
		this.content = content;
		this.rating = rating;
	}

	public String getCustomer() {
		return customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}

	public String getFacility() {
		return facility;
	}

	public void setFacility(String facility) {
		this.facility = facility;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}
	
}
