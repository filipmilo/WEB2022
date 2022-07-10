package controller;

import static spark.Spark.get;
import static spark.Spark.post;

import com.google.gson.Gson;

import dto.NewFacilityDTO;
import dto.NewMembershipDTO;
import model.Membership;
import model.SportsFacility;
import service.FacilityService;
import service.MembershipService;
import util.Authorization;
import util.GsonSerializer;

public class MembershipController {
	
	private static Gson g = GsonSerializer.makeGson();
	private static MembershipService membershipService = new MembershipService();
	
	public static void getAll() {
		get("rest/memberships/", (req, res) -> {
			res.type("application/json");
			return g.toJson(membershipService.getFacilitiesArrayList());
		});
	}
	
	public static void newMembership() {
		post("rest/memberships/new/", (req, res) -> {
			res.type("application/json");
			
			String jwt = req.headers("Authorization");
			if(!Authorization.isLoggedIn(UserController.key, jwt))
				return "null";
			
			NewMembershipDTO processDto = g.fromJson(req.body(), NewMembershipDTO.class);
			
			Membership membership = new Membership(processDto.getType(), processDto.getDateOfPayment(), processDto.getDateOfExpiration(), processDto.getFee(), 
					processDto.getCustomer(), processDto.isStatus(), processDto.getDailyLimit());
			
			membership = membershipService.newMembership(membership);
			
//			if(processDto.getManager() != "") {
//				UserController.userService.addFacilityToManager(processDto.getManager(), facility);
//			}
			
			return membership;
		});
	}
}
