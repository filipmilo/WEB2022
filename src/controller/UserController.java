package controller;

import static spark.Spark.get;

import com.google.gson.Gson;

import service.UserService;

public class UserController {
	
	private static Gson g = new Gson();
	private static UserService userService = new UserService();
	
	public static void getUsers() {
		get("rest/users/", (req, res) -> {
			res.type("application/json");
			return g.toJson(userService.getUsers());
		});
	}
}
