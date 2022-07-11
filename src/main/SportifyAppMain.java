package main;

import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;

import controller.CommentsController;
import controller.FacilityController;

import controller.TrainingController;
import controller.TrainingHistoryController;
import controller.MembershipController;

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
		UserController.getUserData();
		UserController.getAllManagers();
		UserController.getManagerFacilityId();
		UserController.getAllCoaches();
		UserController.addTraining();
		
		FacilityController.getAll();
		FacilityController.searchFacilities();
		FacilityController.getFacilityById();
		FacilityController.newFacility();
		FacilityController.getAllFacilityTypes();

		TrainingController.addContent();
		TrainingController.getContent();
		TrainingController.editContent();
		TrainingController.getCoachTrainings();
		TrainingController.deleteTraining();

		MembershipController.getAll();
		MembershipController.newMembership();
		MembershipController.getMembershipByUsername();
		MembershipController.reduceVisits();
		MembershipController.checkApplicationValidity();
		
		TrainingHistoryController.getAll();
		TrainingHistoryController.addTrainingHistory();
    
    CommentsController.getCommentsByFacility();
		CommentsController.addComment();
		CommentsController.changeCommentStatus();


	}

}
