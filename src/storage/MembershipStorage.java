package storage;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.StringTokenizer;

import model.Membership;
import model.SportsFacility;
import model.User;

public class MembershipStorage {
	private HashMap<String, Membership> allMemberships = new HashMap<String, Membership>();
	private ArrayList<Membership> allMems = new ArrayList<Membership>();
	private File file;
	
	public MembershipStorage() {
		this("resources\\data");
	}
	
	public MembershipStorage(String path) {
		BufferedReader in = null;
		try {
			file = new File(path + "/memberships.txt");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			readAllMemberships(in);
		} catch(IOException e) {
			e.printStackTrace();
		} finally {
			if(in != null) {
				try {
					in.close();
				} catch (Exception e){}
			}
		}
	}
	
	private void readAllMemberships(BufferedReader in) {
		String line, id = "", type = "", dateOfPayment = "", dateOfExpiration = "", customer = "";
		boolean status = false;
		int fee = 0, dailyLimit = 0;
		
		StringTokenizer st;
		
		try {
			int i = 0;
			while((line = in.readLine()) != null) {
				line = line.trim();
				if(line.equals("") || line.indexOf("#") == 0) 
					continue;
				st = new StringTokenizer(line, ";");
				while(st.hasMoreTokens()) {
					id = st.nextToken().trim();
					type = st.nextToken().trim();
					dateOfPayment = st.nextToken().trim();
					dateOfExpiration = st.nextToken().trim();
					fee = Integer.parseInt(st.nextToken().trim());
					customer = st.nextToken().trim();
					status = Boolean.parseBoolean(st.nextToken().trim());
					dailyLimit = Integer.parseInt(st.nextToken().trim());
				}
				
				Membership membership = new Membership(id, type, LocalDate.parse(dateOfPayment), LocalDate.parse(dateOfExpiration), 
						fee, customer, status, dailyLimit);
				allMemberships.put(membership.getId(), membership);
				allMems.add(membership);
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
		
	}
	
	private void save() {
		try {
			PrintWriter out = new PrintWriter(new FileWriter(file), true);
			
			for(Membership membership: allMemberships.values()) {
				String str = makeLine(membership);
				out.println(str);
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private String makeLine(Membership membership) {
		
		StringBuilder str = new StringBuilder();
		str.append(membership.getId());
		str.append(";");
		str.append(membership.getType());
		str.append(";");
		str.append(membership.getDateOfPayment());
		str.append(";");
		str.append(membership.getDateOfExpiration());
		str.append(";");
		str.append(membership.getFee());
		str.append(";");
		str.append(membership.getCustomer());
		str.append(";");
		str.append(membership.isStatus());
		str.append(";");
		str.append(membership.getDailyLimit());
		
		
		return str.toString();
	}
	
	public ArrayList<Membership> getArray() {
		return allMems;
	}
	
	public Membership addMembership(Membership membership) {
		allMemberships.put(membership.getId(), membership);
		allMems.add(membership);
		save();
		return membership;
	}
	
	public Membership editMembership(Membership membership) {
		allMemberships.put(membership.getId(), membership);
		for(Membership m: allMems) {
			if(m.getId().equals(membership.getId())) {
				allMems.remove(m);
				allMems.add(membership);
				break;
			}
		}
		save();
		return membership;
	}
}
