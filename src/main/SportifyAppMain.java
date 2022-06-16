package main;

import static spark.Spark.port;
import static spark.Spark.staticFiles;
import static spark.Spark.get;

import java.io.File;

import controller.UserController;

public class SportifyAppMain {

	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		port(8080);
		staticFiles.externalLocation(new File("./static/html").getCanonicalPath());
		get("/hello", (req, res) -> "Hello World");
		
		UserController.getUsers();
		UserController.Register();
	}

}
