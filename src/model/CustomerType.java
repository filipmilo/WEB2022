package model;

enum Level {
	GOLDEN,
	SILVER,
	BRONZE
}

public class CustomerType {
	

	private boolean deleted;
	
	private Level level;
	private double discount;
	private int requiredPoints;
	
	
	public Level getLevel() {
		return level;
	}
	public void setLevel(Level level) {
		this.level = level;
	}
	public double getDiscount() {
		return discount;
	}
	public void setDiscount(double discount) {
		this.discount = discount;
	}
	public int getRequiredPoints() {
		return requiredPoints;
	}
	public void setRequiredPoints(int requiredPoints) {
		this.requiredPoints = requiredPoints;
	}
	
	
}
