package service;

import java.util.ArrayList;
import java.util.Iterator;

import model.Membership;
import model.SportsFacility;
import storage.MembershipStorage;

public class MembershipService {
	private MembershipStorage memberships = new MembershipStorage();
	
	public ArrayList<Membership> getMembershipArray() {
		return memberships.getArray();
	}
	
	public Membership newMembership(Membership membership) {
		
		int id = 0;
		
		for(Membership mem: memberships.getArray()) {
			if(mem.getCustomer().equals(membership.getCustomer())) {
				membership.setId(mem.getId());
				memberships.editMembership(membership);
				return membership;
			}
		}
		
		for(Membership mem: memberships.getArray()) {
			if(Integer.parseInt(mem.getId()) > id) {
				id++;
			}
		}
		
		membership.setId(Integer.toString(++id));
		
		return memberships.addMembership(membership);
	}
	
	public Membership getByUsername(String username) {
		return memberships.getByUsername(username);
	}
	
	public Membership reduceVisits(String username) {
		Membership mem = memberships.getByUsername(username);
		mem.setRemainingVisits(mem.getRemainingVisits() - 1);
		memberships.editMembership(mem);
		
		return mem;
	}

}
