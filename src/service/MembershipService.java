package service;

import java.util.ArrayList;
import java.util.Iterator;

import model.Membership;
import model.SportsFacility;
import storage.MembershipStorage;

public class MembershipService {
	private MembershipStorage memberships = new MembershipStorage();
	
	public ArrayList<Membership> getFacilitiesArrayList() {
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

}
