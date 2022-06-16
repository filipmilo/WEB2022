package controller;

import static spark.Spark.get;

import java.time.LocalDate;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import model.LocalDateDeserializer;
import model.LocalDateSerializer;
import service.UserService;

public class UserController {
	
	private static Gson g = makeGson();
	private static UserService userService = new UserService();
	
	public static void getUsers() {
		get("rest/users/", (req, res) -> {
			res.type("application/json");
			return g.toJson(userService.getUsers());
		});
	}
	
	private static Gson makeGson() {
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.registerTypeAdapter(LocalDate.class, new LocalDateSerializer());
		gsonBuilder.registerTypeAdapter(LocalDate.class, new LocalDateDeserializer());
		Gson gson = gsonBuilder.setPrettyPrinting().create();
		
		return gson;
	}
	
}
