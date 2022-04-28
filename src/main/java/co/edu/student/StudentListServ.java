package co.edu.student;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/StudentList.json")
public class StudentListServ extends HttpServlet {
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// [{"studentNo": ?, "studentName" : "?", "kor_score" : ?, "eng_score" : ?}]
		resp.setCharacterEncoding("UTF-8");
		resp.setContentType("text/plain;charset=UTF-8");
		StudentDAO dao = new StudentDAO();
		List<Student> list = dao.studentList();

		String jsonString = "[";
		for (int i = 0; i < list.size(); i++) {
			jsonString += "{\"studentNo\": " + list.get(i).getStudentNo() + ", " + "\"studentName\" : \""
					+ list.get(i).getStudentName() + "\",\"eng_score\": " + list.get(i).getEngScore() + ", "
					+ "\"kor_score\":" + list.get(i).getKorScore() + "}";

			if (i != list.size() - 1) {
				jsonString += ",";
			}
		}

		jsonString += "]";
		resp.getWriter().print(jsonString);

	}
}
