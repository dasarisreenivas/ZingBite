package com.app.zingbiteServlets;

import java.io.IOException;
import java.io.BufferedReader;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import com.app.zingbitemodels.User;
import com.app.zingbitemodels.Job;
import com.app.zingbitemodels.Application;
import com.app.zingbitemodels.EmailNotification;
import com.app.zingbiteutils.DBUtils;
import com.app.zingbiteutils.LRUCache;
import com.app.zingbiteutils.SanitizationUtils;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/api/careers")
public class CareersServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // Global jobs list cache: 5 minutes fresh (TTL), 15 minutes stale (SWR)
    public static final LRUCache<String, List<Job>> jobsCache = new LRUCache<>(1, 5 * 60 * 1000, 15 * 60 * 1000);

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        String action = req.getParameter("action");
        if (action == null) action = "jobs";

        Gson gson = new Gson();

        if ("jobs".equals(action)) {
            try {
                List<Job> jobsList = jobsCache.get("all", key -> {
                    System.out.println("[CareersServlet] Cache miss/revalidate: Loading jobs from DB");
                    try (Session hibernateSession = DBUtils.openSession()) {
                        String hql = "from Job order by id desc";
                        Query<Job> query = hibernateSession.createQuery(hql, Job.class);
                        List<Job> list = query.list();

                        // Auto-populate default job listings for demo if empty
                        if (list.isEmpty()) {
                            Transaction tx = null;
                            try {
                                tx = hibernateSession.beginTransaction();
                                Job j1 = new Job("Delivery Rider", "Operations", "Anantapur, AP", "Deliver orders safely and swiftly to customer locations. Flexible hours, attractive incentives, and instant payout.", "June 01, 2026");
                                Job j2 = new Job("Kitchen Supervisor", "Culinary", "Bangalore, KA", "Supervise preparing food orders, maintain kitchen safety hygiene standards, and manage supply items.", "May 30, 2026");
                                Job j3 = new Job("Frontend React Developer", "Engineering", "Remote", "Build high-performance web components, optimize webapp loading times, and design clean aesthetics.", "May 28, 2026");
                                
                                hibernateSession.persist(j1);
                                hibernateSession.persist(j2);
                                hibernateSession.persist(j3);
                                tx.commit();
                                
                                list = hibernateSession.createQuery("from Job order by id desc", Job.class).list();
                            } catch (Exception ex) {
                                if (tx != null) tx.rollback();
                                ex.printStackTrace();
                            }
                        }
                        return list;
                    }
                });

                resp.getWriter().write(gson.toJson(jobsList));
            } catch (Exception e) {
                e.printStackTrace();
                resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                resp.getWriter().write("{\"error\":\"Failed to load jobs\"}");
            }

        } else if ("applications".equals(action)) {
            HttpSession session = req.getSession(false);
            if (session == null || session.getAttribute("loggedInUser") == null) {
                resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                resp.getWriter().write("{\"error\":\"Please log in to view applications\"}");
                return;
            }

            User user = (User) session.getAttribute("loggedInUser");
            JsonArray responseArray = new JsonArray();

            try (Session hibernateSession = DBUtils.openSession()) {
                String hql = "from Application where userId = :userId order by id desc";
                Query<Application> query = hibernateSession.createQuery(hql, Application.class);
                query.setParameter("userId", user.getUserID());
                List<Application> appList = query.list();

                for (Application app : appList) {
                    JsonObject aJson = new JsonObject();
                    aJson.addProperty("id", app.getId());
                    aJson.addProperty("candidateName", app.getCandidateName());
                    aJson.addProperty("status", app.getStatus());
                    aJson.addProperty("appliedDate", app.getAppliedDate());
                    aJson.addProperty("resumeUrl", app.getResumeUrl());
                    
                    Job job = hibernateSession.get(Job.class, app.getJobId());
                    aJson.addProperty("jobTitle", job != null ? job.getTitle() : "Position");
                    aJson.addProperty("department", job != null ? job.getDepartment() : "");
                    aJson.addProperty("location", job != null ? job.getLocation() : "");

                    responseArray.add(aJson);
                }

                resp.getWriter().write(responseArray.toString());
            } catch (Exception e) {
                e.printStackTrace();
                resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                resp.getWriter().write("{\"error\":\"Failed to load applications\"}");
            }
        } else if ("notifications".equals(action)) {
            HttpSession session = req.getSession(false);
            if (session == null || session.getAttribute("loggedInUser") == null) {
                resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                resp.getWriter().write("{\"error\":\"Please log in to view notifications\"}");
                return;
            }

            User user = (User) session.getAttribute("loggedInUser");
            try (Session hibernateSession = DBUtils.openSession()) {
                String hql = "from EmailNotification where userId = :userId order by id desc";
                Query<EmailNotification> query = hibernateSession.createQuery(hql, EmailNotification.class);
                query.setParameter("userId", user.getUserID());
                List<EmailNotification> notesList = query.list();
                resp.getWriter().write(gson.toJson(notesList));
            } catch (Exception e) {
                e.printStackTrace();
                resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                resp.getWriter().write("{\"error\":\"Failed to load notifications\"}");
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        HttpSession session = req.getSession(false);
        if (session == null || session.getAttribute("loggedInUser") == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Please log in to apply\"}");
            return;
        }

        User user = (User) session.getAttribute("loggedInUser");

        try {
            BufferedReader reader = req.getReader();
            JsonObject requestBody = JsonParser.parseReader(reader).getAsJsonObject();

            int jobId = requestBody.get("jobId").getAsInt();
            String name = SanitizationUtils.escapeHtml(requestBody.get("name").getAsString());
            String email = requestBody.get("email").getAsString().trim().toLowerCase();
            String phone = requestBody.get("phone").getAsString().trim();
            String resumeUrl = requestBody.has("resumeUrl") ? requestBody.get("resumeUrl").getAsString() : "https://zingbite.com/resumes/demo.pdf";
            String city = requestBody.has("city") && !requestBody.get("city").isJsonNull() ? SanitizationUtils.escapeHtml(requestBody.get("city").getAsString()) : null;
            String vehicleType = requestBody.has("vehicle") && !requestBody.get("vehicle").isJsonNull() ? SanitizationUtils.escapeHtml(requestBody.get("vehicle").getAsString()) : null;

            // Rate limit: check if already applied for this job
            try (Session checkSession = DBUtils.openSession()) {
                String countHql = "select count(a) from Application a where a.userId = :userId and a.jobId = :jobId and a.status = :status";
                Query<Long> countQuery = checkSession.createQuery(countHql, Long.class);
                countQuery.setParameter("userId", user.getUserID());
                countQuery.setParameter("jobId", jobId);
                countQuery.setParameter("status", "Applied");
                Long pendingCount = countQuery.uniqueResult();
                if (pendingCount != null && pendingCount > 0) {
                    resp.setStatus(HttpServletResponse.SC_CONFLICT);
                    resp.getWriter().write("{\"error\":\"You have already applied for this position. Please wait for a response.\"}");
                    return;
                }
            } catch (Exception rateEx) {
                rateEx.printStackTrace();
            }

            Application app = new Application();
            app.setJobId(jobId);
            app.setCandidateName(name);
            app.setEmail(email);
            app.setPhone(phone);
            app.setResumeUrl(resumeUrl);
            app.setStatus("Applied");
            app.setAppliedDate(new SimpleDateFormat("MMMM dd, yyyy").format(new Date()));
            app.setUserId(user.getUserID());

            Transaction tx = null;
            try (Session hibernateSession = DBUtils.openSession()) {
                tx = hibernateSession.beginTransaction();
                hibernateSession.persist(app);

                // Update User details if it is a rider application
                Job job = hibernateSession.get(Job.class, jobId);
                if (job != null && "Delivery Rider".equalsIgnoreCase(job.getTitle())) {
                    User u = hibernateSession.get(User.class, user.getUserID());
                    if (u != null) {
                        if (city != null) u.setCity(city);
                        if (vehicleType != null) u.setVehicleType(vehicleType);
                        u.setRiderStatus("Pending");
                        hibernateSession.merge(u);
                        
                        // Update the session user
                        session.setAttribute("loggedInUser", u);
                    }
                }

                tx.commit();
                
                resp.getWriter().write("{\"success\":true}");
            } catch (Exception e) {
                if (tx != null) tx.rollback();
                throw e;
            }

        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"Failed to submit application\"}");
        }
    }
}
