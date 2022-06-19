package dto;

public class UserJwtDTO {
	private String username;
	private String role;
	private String jwt;
	
	public UserJwtDTO(String username, String role, String jwt) {
		super();
		this.username = username;
		this.role = role;
		this.jwt = jwt;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getJwt() {
		return jwt;
	}

	public void setJwt(String jwt) {
		this.jwt = jwt;
	}

}
