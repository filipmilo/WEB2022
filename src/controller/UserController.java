package controller;

import static spark.Spark.get;
import static spark.Spark.post;

import java.security.Key;
import java.util.Date;

import com.google.gson.Gson;

import dto.EditUserDTO;
import dto.RegisterDTO;
import dto.UserJwtDTO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import model.User;
import service.UserService;
import util.Authorization;
import util.GsonSerializer;

public class UserController {
	
	private static Gson g = GsonSerializer.makeGson();
	public static UserService userService = new UserService();
	
	public static Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	
	public static void getUsers() {
		get("rest/users/", (req, res) -> {
			res.type("application/json");
			
			String jwt = req.headers("Authorization");
			if(!Authorization.isLoggedIn(key, jwt))
				return "null";
			
			return g.toJson(userService.getUsers());
		});
	}
	
	public static void Register() {
		post("rest/users/register/", (req, res) -> {
			res.type("application/json");
			System.out.println(req.body());
			RegisterDTO data = g.fromJson(req.body(), RegisterDTO.class);
			if(data.getRole() == "undefined") data.setRole("CUSTOMER");
			return userService.addUser(
					new User(data.getUsername(), data.getPassword(), data.getName(), data.getSurname(), data.getGender(), data.getDateofBirth(), data.getRole())
					) == true ? "SUCCESS" : "FAIL";
		});
	}
	
	public static void Login() {
		get("rest/users/login/", (req, res) -> {
			res.type("application/json");
			String username = req.queryParams("username");
			String password = req.queryParams("password");
			
			User user = userService.getUser(username, password);
			
			if(user != null) {
				String jws = Jwts.builder().setSubject(user.getUsername()).setExpiration(new Date(new Date().getTime() + 1000*7200L)).setIssuedAt(new Date()).signWith(key).compact();
				UserJwtDTO dto = new UserJwtDTO(user.getUsername(), user.getRoleStr(), jws);
				System.out.println("Returned JWT: " + jws);
				return g.toJson(dto);
			} else {
				return g.toJson(null);
			}
			
		}); 
	}
	
	public static void getUserData() {
		get("rest/users/getData/", (req, res) -> {
			res.type("application/json");
			String username = req.queryParams("username");
			String jwt = req.headers("Authorization");
			
			if(!Authorization.isLoggedIn(key, jwt))
			return "null";
			
			User user = userService.getUser(username);
			
			return g.toJson(new EditUserDTO(user.getUsername(), user.getPassword(), user.getName(), user.getSurname(),user.getGenderStr(), user.getDateOfBirth().toString(), user.getRoleStr()));
		}); 
	}
	
	public static void EditUserInfo() {
		post("rest/users/edit/", (req, res) -> {
			String jwt = req.headers("Authorization");
			if(!Authorization.isLoggedIn(key, jwt))
			return "null";
			
			EditUserDTO user = g.fromJson(req.body(), EditUserDTO.class);
			
			String username = user.getUsername();
			String password = user.getPassword();
			String name = user.getName();
			String surname = user.getSurname();
			String date = user.getDateofBirth();
			String gender = user.getGender();
			
			String changes = password + "," + name + "," + surname + "," + gender + "," + date;
			
			User convert = userService.editUser(username, changes);
			
			return g.toJson(user);
			
		});
	}
	
	public static void getAllCoaches() {
		get("rest/users/coaches/", (req, res) ->{
			res.type("application/json");
			
			String jwt = req.headers("Authorization");
			if(!Authorization.isLoggedIn(key, jwt))
				return "null";
			
			return g.toJson(userService.getAllCoaches());
		});
	}
	
	public static void getAllManagers() {
		get("rest/users/managers/", (req, res) ->{
			res.type("application/json");
			
			String jwt = req.headers("Authorization");
			if(!Authorization.isLoggedIn(key, jwt))
				return "null";
			
			return g.toJson(userService.getAllAvailableManagers());
		});
	}
	
	public static void getManagerFacilityId() {
		get("rest/users/managerfacility/", (req, res) -> {
			res.type("application/json");
			
			String jwt = req.headers("Authorization");
			if(!Authorization.isLoggedIn(key, jwt) && jwt != null)
				return "nothing";
			
			String username = req.queryParams("username");
			
			return g.toJson(userService.getManagerFacility(username));
		});
	}

	public static void addTraining() {
		post("rest/users/addTraining/", (req, res) -> {
			res.type("application/json");
			
			String jwt = req.headers("Authorization");
			if(!Authorization.isLoggedIn(key, jwt) && jwt != null)
				return "nothing";
			
			String username = req.queryParams("username");
			String training = req.queryParams("training");
			
			return g.toJson(userService.addTraining(username, training));
		});
	}
	
}
