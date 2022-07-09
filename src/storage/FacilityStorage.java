package storage;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.StringTokenizer;

import model.SportsFacility;
import model.User;

public class FacilityStorage {
	private HashMap<String, SportsFacility> allFacilities = new HashMap<String, SportsFacility>();
	private ArrayList<SportsFacility> allfacs = new ArrayList<SportsFacility>();
	private File file;
	
	public FacilityStorage() {
		this("resources\\data");
	}
	
	public FacilityStorage(String path) {
		BufferedReader in = null;
		try {
			file = new File(path + "/facilities.txt");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			readAllFacilities(in);
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
	
	private void readAllFacilities(BufferedReader in) {
		String line, name = "", type = "", content = "", logoPath = "", workingHours = "", address="", id = "";
		boolean status = false;
		double avgRating = 0.0, longitude = 0.0, latitude = 0.0;
		
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
					name = st.nextToken().trim();
					type = st.nextToken().trim();
					content = st.nextToken().trim();
					status = Boolean.parseBoolean(st.nextToken().trim());
					longitude = Double.parseDouble(st.nextToken().trim());
					latitude = Double.parseDouble(st.nextToken().trim());
					address = st.nextToken().trim();
					logoPath = st.nextToken().trim();
					avgRating = Double.parseDouble(st.nextToken().trim());
					workingHours = st.nextToken().trim();
				}
				
				SportsFacility fac = new SportsFacility(name, type, content, status, logoPath, avgRating, workingHours, longitude, latitude, address);
				//allFacilities.put(java.util.UUID.randomUUID().toString(), fac);
				fac.setId(id);
				allFacilities.put(fac.getId(), fac);
				allfacs.add(fac);
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
		
	}
	
	private void save() {
		try {
			PrintWriter out = new PrintWriter(new FileWriter(file), true);
			
			for(SportsFacility facility: allFacilities.values()) {
				String str = makeLine(facility);
				out.println(str);
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
private String makeLine(SportsFacility facility) {
		
		StringBuilder str = new StringBuilder();
		str.append(facility.getId());
		str.append(";");
		str.append(facility.getName());
		str.append(";");
		str.append(facility.getType());
		str.append(";");
		str.append(facility.getContent());
		str.append(";");
		str.append(facility.isStatus());
		str.append(";");
		str.append(facility.getLocation().getLongitude());
		str.append(";");
		str.append(facility.getLocation().getLatitude());
		str.append(";");
		str.append(facility.getLocation().getAddress());
		str.append(";");
		str.append(facility.getLogoPath());
		str.append(";");
		str.append(facility.getAvgRating());
		str.append(";");
		str.append(facility.getWorkingHours());
		
		return str.toString();
	}
	
	public Collection<SportsFacility> getAll() {
		return allFacilities.values();
	}
	
	public HashMap<String, SportsFacility> getHashMap() {
		return allFacilities;
	}
	
	public ArrayList<SportsFacility> getArray() {
		return allfacs;
	}
	
	public SportsFacility getById(String id) {
		return allFacilities.get(id);
	}
	
	public SportsFacility addFacility(SportsFacility facility) {
		allFacilities.put(facility.getId(), facility);
		allfacs.add(facility);
		save();
		return facility;
	}
	
	public SportsFacility editFacility(SportsFacility facility) {
		allFacilities.put(facility.getId(), facility);
		for(SportsFacility sf: allfacs) {
			if(sf.getId().equals(facility.getId())) {
				allfacs.remove(sf);
				allfacs.add(facility);
				break;
			}
		}
		save();
		return facility;
	}
}
