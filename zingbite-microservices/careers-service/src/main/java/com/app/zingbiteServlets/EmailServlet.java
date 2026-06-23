package com.app.zingbiteServlets;

import java.io.IOException;
import java.util.List;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.hibernate.Session;
import org.hibernate.query.Query;
import com.app.zingbitemodels.EmailNotification;
import com.app.zingbitemodels.User;
import com.app.zingbiteutils.DBUtils;
import com.app.zingbiteutils.AuthorizationUtils;
import com.google.gson.Gson;

@WebServlet("/api/emails")
public class EmailServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        User user = AuthorizationUtils.requireAuthenticated(req);
        if (user == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Please log in to view emails.\"}");
            return;
        }

        String allParam = req.getParameter("all");
        boolean fetchAll = "true".equalsIgnoreCase(allParam) && "super_admin".equalsIgnoreCase(user.getRole());

        try (Session dbSession = DBUtils.openSession()) {
            List<EmailNotification> emails;
            if (fetchAll) {
                Query<EmailNotification> q = dbSession.createQuery(
                    "from EmailNotification order by id desc", EmailNotification.class
                );
                q.setMaxResults(100);
                emails = q.list();
            } else {
                Query<EmailNotification> q = dbSession.createQuery(
                    "from EmailNotification where userId = :userId order by id desc", EmailNotification.class
                );
                q.setParameter("userId", user.getUserID());
                q.setMaxResults(50);
                emails = q.list();
            }

            resp.getWriter().write(gson.toJson(emails));
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"Failed to retrieve emails: " + e.getMessage() + "\"}");
        }
    }
}
