package controller;

import static spark.Spark.get;
import static spark.Spark.post;

import java.security.Key;
import java.util.Date;

import com.google.gson.Gson;

import dto.RegisterDTO;
import dto.UserJwtDTO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import model.User;
import service.UserService;
import util.GsonSerializer;

public class UserController {
	
	private static Gson g = GsonSerializer.makeGson();
	private static UserService userService = new UserService();
	
	private static Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	
	public static void getUsers() {
		get("rest/users/", (req, res) -> {
			res.type("application/json");
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
	
}
