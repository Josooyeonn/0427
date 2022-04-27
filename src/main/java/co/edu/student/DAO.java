package co.edu.student;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DAO {
//	DriverManager
	Connection conn;
	Statement stmt; // 쿼리 실행, 결과
	ResultSet rs; // 해시셋 (정보받음) 쿼리 실행 결과를 set타입으로 가져옴.
	PreparedStatement psmt; //

	public Connection getConnect() {

	 	try {
  	      		Class.forName("oracle.jdbc.driver.OracleDriver"); // 오라클 주소
	 		conn = DriverManager.getConnection("jdbc:oracle:thin:@192.168.0.125:1521:xe", "hr", "hr"); // 드라이버 주소
	 	} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return conn;
	}

	public void disconnect() {
		try {
	  		if (rs != null)
		 		rs.close();

	  		if (stmt != null)
				stmt.close();

			if (psmt != null)
				psmt.close();

			if (conn != null)
				conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

}
