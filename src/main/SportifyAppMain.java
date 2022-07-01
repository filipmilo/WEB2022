package main;

import static spark.Spark.port;
import static spark.Spark.staticFiles;
import static spark.Spark.get;

import java.io.File;

import controller.FacilityController;
import controller.UserController;

public class SportifyAppMain {

	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		port(8080);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		UserController.getUsers();
		UserController.Register();
		UserController.Login();
		UserController.EditUserInfo();
		
		FacilityController.getAll();
		FacilityController.searchFacilities();
	}

}
