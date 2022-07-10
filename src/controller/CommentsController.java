package controller;

import static spark.Spark.get;
import static spark.Spark.post;

import com.google.gson.Gson;

import dto.NewCommentDTO;
import model.Comment;
import service.CommentsService;
import util.GsonSerializer;

public class CommentsController {
	private static Gson g = GsonSerializer.makeGson();
	public static CommentsService commentService = new CommentsService();
	
	//methods
	public static void getCommentsByFacility() {
		get("rest/comments/getByFacility/", (req, res) -> {
			res.type("application/json");
			
			String facility = req.queryParams("facilityId");
			
			return g.toJson(commentService.getAllByFacility(facility));
		});
	}
	
	public static void addComment() {
		post("rest/comments/addComment/", (req, res) ->{
			res.type("application/json");
			
			NewCommentDTO comment = g.fromJson(req.body(), NewCommentDTO.class);
			
			Comment newComment = new Comment(comment.getCustomer(), comment.getFacility(), comment.getContent(), comment.getRating());
			
			return g.toJson(commentService.addComment(newComment));
		});
	}
	
	public static void changeCommentStatus() {
		post("rest/comments/changeStatus/", (req, res) ->{
			res.type("application/json");
			
			String commentId = req.queryParams("comment");
			String status = req.queryParams("newStatus");
			
			return g.toJson(commentService.changeStatus(commentId, status));
		});
	}
}
