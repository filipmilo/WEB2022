package model;

public class Comment {
	

	private boolean deleted;
	
	private String id;
	private String status;
	private String customer;
	private String facility;
	private String content;
	private int rating;
	
	
	
	public Comment(String customer, String facility, String content, int rating) {
		super();
		this.status = "waiting";
		this.deleted = false;
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
	public boolean isDeleted() {
		return deleted;
	}
	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	
}
