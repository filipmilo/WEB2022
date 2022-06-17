package controller;

import static spark.Spark.get;
import static spark.Spark.post;

import java.time.LocalDate;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import dto.RegisterDTO;
import model.User;
import service.UserService;
import util.GsonSerializer;
import util.LocalDateDeserializer;
import util.LocalDateSerializer;

public class UserController {
	
	private static Gson g = GsonSerializer.makeGson();
	private static UserService userService = new UserService();
	
	public static void getUsers() {
		get("rest/users/", (req, res) -> {
			res.type("application/json");
			return g.toJson(userService.getUsers());
		});
	}
	
	public static void Register() {
		post("rest/users/register/", (req, res) -> {
			res.type("application/json");
			RegisterDTO data = g.fromJson(req.body(), RegisterDTO.class);
			return userService.addUser(
					new User(data.getUsername(), data.getPassword(), data.getName(), data.getSurname(), data.getGender(), data.getDateofBirth(), "Customer")
					) == true ? "SUCCESS" : "FAIL";
		});
	}
	
}
