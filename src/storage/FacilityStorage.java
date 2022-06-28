package storage;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.StringTokenizer;

import model.SportsFacility;

public class FacilityStorage {
	private HashMap<String, SportsFacility> allFacilities = new HashMap<String, SportsFacility>();
	private ArrayList<SportsFacility> allfacs = new ArrayList<SportsFacility>();
	private File file;
	
	public FacilityStorage() {
		this("data");
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
		String line, name = "", type = "", content = "", logoPath = "", workingHours = "", address="";
		boolean status = false;
		double avgRating = 0.0, longitude = 0.0, latitude = 0.0;
		
		StringTokenizer st;
		
		try {
			while((line = in.readLine()) != null) {
				line = line.trim();
				if(line.equals("") || line.indexOf("#") == 0) 
					continue;
				st = new StringTokenizer(line, ";");
				while(st.hasMoreTokens()) {
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
				allfacs.add(fac);
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
		
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
}
