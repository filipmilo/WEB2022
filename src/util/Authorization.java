package util;

import java.security.Key;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;

public class Authorization {
	
	public static boolean isLoggedIn(Key key, String header) {
		if(header != null && header.contains("Bearer ")) {
			String jwt = header.substring(header.indexOf("Bearer ") + 7);
			try {
				Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
				return true;
			} catch (Exception e) {
				// TODO: handle exception
				System.out.println(e.getMessage());
				return false;
			}
		}
		
		return false;
	}
}
