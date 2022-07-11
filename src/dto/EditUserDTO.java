package dto;


public class EditUserDTO {
	private String username;
	private String password;
	private String name;
	private String surname;
	private String gender;
	private String dateOfBirth;
	private String customerType;
	
	private String role;

	public EditUserDTO(String username, String password, String name, String surname, String gender, String dateofBirth,
			String role) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.dateOfBirth = dateofBirth;
		this.role = role;
	}
	
	public EditUserDTO(String username, String password, String name, String surname, String gender, String dateofBirth,
			String role, String customerType) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.dateOfBirth = dateofBirth;
		this.role = role;
		this.customerType = customerType;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getDateofBirth() {
		return dateOfBirth;
	}

	public void setDateofBirth(String dateofBirth) {
		this.dateOfBirth = dateofBirth;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
	
	
}
