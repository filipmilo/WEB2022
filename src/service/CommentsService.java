package service;

import java.util.ArrayList;

import model.Comment;
import storage.CommentsStorage;

public class CommentsService {
	private CommentsStorage comments = new CommentsStorage();
	
	//methods
	
	public ArrayList<Comment> getAllByFacility(String facility, boolean isOnlyApproved) {
		ArrayList<Comment> requiredComments = new ArrayList<Comment>();
		
		for(Comment c: comments.getAll()) {
			if(isOnlyApproved && c.getFacility().equals(facility) && c.getStatus().equals("approved")) {
				requiredComments.add(c);
			} else if(!isOnlyApproved && c.getFacility().equals(facility)) {
				requiredComments.add(c);
			}
		}
		
		return requiredComments;
	}
	
	public Comment addComment(Comment comment) {
		int id = 0;
		
		for(Comment c: comments.getAll()) {
			if(Integer.parseInt(c.getId()) > id) id++;
		}
		
		comment.setId(Integer.toString(++id));
		
		return comments.addComment(comment);
	}
	
	public Comment changeStatus(String comment, String status) {
		Comment c = comments.getById(comment);
		
		c.setStatus(status);
		
		return comments.addComment(c);
	}
}
