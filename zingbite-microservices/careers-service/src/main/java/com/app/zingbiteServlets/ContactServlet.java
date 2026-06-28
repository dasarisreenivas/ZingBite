package com.app.zingbiteServlets;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;
import java.io.BufferedReader;
import java.text.SimpleDateFormat;
import java.util.Date;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.app.zingbitemodels.ContactMessage;
import com.app.zingbiteutils.DBUtils;
import com.app.zingbiteutils.SanitizationUtils;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/api/contact")
public class ContactServlet extends HttpServlet {
    private static final Logger LOGGER = LoggerFactory.getLogger(ContactServlet.class);

    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        try {
            BufferedReader reader = req.getReader();
            JsonObject requestBody = JsonParser.parseReader(reader).getAsJsonObject();

            String name = requestBody.has("name") ? SanitizationUtils.escapeHtml(requestBody.get("name").getAsString()) : null;
            String email = requestBody.has("email") ? requestBody.get("email").getAsString().trim().toLowerCase() : null;
            String subject = requestBody.has("subject") ? SanitizationUtils.escapeHtml(requestBody.get("subject").getAsString()) : null;
            String message = requestBody.has("message") ? SanitizationUtils.escapeHtml(requestBody.get("message").getAsString()) : null;

            if (name == null || email == null || subject == null || message == null ||
                name.trim().isEmpty() || email.trim().isEmpty() || subject.trim().isEmpty() || message.trim().isEmpty()) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"error\":\"All fields (name, email, subject, message) are required.\"}");
                return;
            }

            String dateStr = new SimpleDateFormat("MMMM dd, yyyy HH:mm").format(new Date());
            ContactMessage contactMsg = new ContactMessage(name, email, subject, message, dateStr);

            Transaction tx = null;
            try (Session hibernateSession = DBUtils.openSession()) {
                tx = hibernateSession.beginTransaction();
                hibernateSession.persist(contactMsg);
                tx.commit();
                resp.getWriter().write("{\"success\":true}");
            } catch (Exception e) {
                if (tx != null) tx.rollback();
                throw e;
            }

        } catch (Exception e) {
            LOGGER.error("Unexpected servlet error", e);
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"Failed to save contact message\"}");
        }
    }
}
