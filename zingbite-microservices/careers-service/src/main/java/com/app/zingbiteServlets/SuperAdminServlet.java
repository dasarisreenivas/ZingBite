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
import com.app.zingbitemodels.Restaurant;
import com.app.zingbitemodels.RestaurantRequest;
import com.app.zingbitemodels.Orders;
import com.app.zingbitemodels.OrderStatus;
import com.app.zingbitemodels.Job;
import com.app.zingbitemodels.Application;
import com.app.zingbitemodels.EmailNotification;
import com.app.zingbiteutils.DBUtils;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

@WebServlet("/api/super-admin")
public class SuperAdminServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    private boolean isSuperAdmin(HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        if (session == null) return false;
        User user = (User) session.getAttribute("loggedInUser");
        if (user == null) return false;
        return "super_admin".equals(user.getRole());
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        if (!isSuperAdmin(req)) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write("{\"error\":\"Forbidden: Only Super Admins can access this resource.\"}");
            return;
        }

        Gson gson = new Gson();

        try (Session hibernateSession = DBUtils.openSession()) {
            // Global counts
            long userCount = hibernateSession.createQuery("select count(u) from User u", Long.class).uniqueResult();
            long restaurantCount = hibernateSession.createQuery("select count(r) from Restaurant r", Long.class).uniqueResult();
            long orderCount = hibernateSession.createQuery("select count(o) from Orders o where o.orderStatus != :pendingStatus", Long.class)
                    .setParameter("pendingStatus", OrderStatus.PENDING_PAYMENT)
                    .uniqueResult();
            Double totalRevenue = hibernateSession.createQuery("select sum(o.totalAmount) from Orders o where o.orderStatus != :pendingStatus", Double.class)
                    .setParameter("pendingStatus", OrderStatus.PENDING_PAYMENT)
                    .uniqueResult();
            if (totalRevenue == null) totalRevenue = 0.0;

            // Fetch users
            List<User> usersList = hibernateSession.createQuery("from User order by userID asc", User.class).list();

            // Fetch applications
            List<Application> appList = hibernateSession.createQuery("from Application order by id desc", Application.class).list();
            JsonArray applicationsJson = new JsonArray();

            for (Application app : appList) {
                JsonObject aJson = new JsonObject();
                aJson.addProperty("id", app.getId());
                aJson.addProperty("candidateName", app.getCandidateName());
                aJson.addProperty("email", app.getEmail());
                aJson.addProperty("phone", app.getPhone());
                aJson.addProperty("resumeUrl", app.getResumeUrl());
                aJson.addProperty("status", app.getStatus());
                aJson.addProperty("appliedDate", app.getAppliedDate());
                aJson.addProperty("userId", app.getUserId());

                // Include rider status from the user entity for rider-specific actions
                User applicantUser = hibernateSession.get(User.class, app.getUserId());
                aJson.addProperty("riderStatus", applicantUser != null && applicantUser.getRiderStatus() != null ? applicantUser.getRiderStatus() : "");

                Job job = hibernateSession.get(Job.class, app.getJobId());
                aJson.addProperty("jobTitle", job != null ? job.getTitle() : "Position");
                applicationsJson.add(aJson);
            }

            // Fetch restaurant registration requests
            List<RestaurantRequest> requestsList = hibernateSession.createQuery("from RestaurantRequest order by id desc", RestaurantRequest.class).list();

            JsonObject stats = new JsonObject();
            stats.addProperty("userCount", userCount);
            stats.addProperty("restaurantCount", restaurantCount);
            stats.addProperty("orderCount", orderCount);
            stats.addProperty("totalRevenue", totalRevenue);
            stats.add("users", gson.toJsonTree(usersList));
            stats.add("applications", applicationsJson);
            stats.add("restaurantRequests", gson.toJsonTree(requestsList));

            resp.getWriter().write(stats.toString());

        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"Failed to fetch admin stats\"}");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        if (!isSuperAdmin(req)) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write("{\"error\":\"Forbidden: Only Super Admins can execute these operations.\"}");
            return;
        }

        try {
            BufferedReader reader = req.getReader();
            JsonObject requestBody = JsonParser.parseReader(reader).getAsJsonObject();
            String action = requestBody.has("action") ? requestBody.get("action").getAsString() : "";

            Transaction tx = null;

            if ("reviewRestaurant".equals(action)) {
                int requestId = requestBody.get("requestId").getAsInt();
                String status = requestBody.get("status").getAsString(); // Approved, Rejected

                try (Session hibernateSession = DBUtils.openSession()) {
                    tx = hibernateSession.beginTransaction();
                    
                    RestaurantRequest rr = hibernateSession.get(RestaurantRequest.class, requestId);
                    if (rr != null) {
                        rr.setStatus(status);
                        hibernateSession.merge(rr);
                        
                        if ("Approved".equals(status)) {
                            // Onboard restaurant
                            Restaurant r = new Restaurant(
                                rr.getRestaurantName(),
                                rr.getDeliveryTime(),
                                rr.getCuisineType(),
                                rr.getAddress(),
                                4.5f,
                                true,
                                rr.getAdminId(),
                                rr.getImagePath()
                            );

                            // Geocode the restaurant address to get real coordinates
                            double[] coords = geocodeAddress(rr.getAddress());
                            if (coords != null) {
                                r.setLatitude(coords[0]);
                                r.setLongitude(coords[1]);
                                System.out.println("[SuperAdmin] Geocoded restaurant '" + rr.getRestaurantName() + "' to: " + coords[0] + ", " + coords[1]);
                            } else {
                                System.out.println("[SuperAdmin] Could not geocode address for restaurant '" + rr.getRestaurantName() + "': " + rr.getAddress());
                            }

                            hibernateSession.persist(r);
                            HomeServlet.restaurantCache.clear();

                            // Force Admin User role to restaurant_admin
                            User adminUser = hibernateSession.get(User.class, rr.getAdminId());
                            if (adminUser != null) {
                                adminUser.setRole("restaurant_admin");
                                hibernateSession.merge(adminUser);

                                // Send approval email
                                com.app.zingbiteutils.EmailService.sendEmailAsync(
                                    adminUser.getUserID(),
                                    adminUser.getEmail(),
                                    "ZingBite Onboarding Approved! 🍕",
                                    "<h2>Restaurant Onboarding Approved! 🎉</h2>"
                                    + "<p>Dear " + adminUser.getUserName() + ", we are thrilled to inform you that your restaurant request for <b>" + rr.getRestaurantName() + "</b> has been approved!</p>"
                                    + "<p>Your role has been upgraded to <b>Restaurant Admin</b>. You can now log into your dashboard to add menu items and manage preparation states.</p>"
                                    + "<a href='" + com.app.zingbiteutils.EmailTemplates.getBaseUrl() + "/restaurant-admin' class='btn' style='display:inline-block;padding:12px 24px;background-color:#F7374F;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:bold;'>Go to Dashboard</a>"
                                );
                            }
                        } else {
                            // Send rejection email
                            User adminUser = hibernateSession.get(User.class, rr.getAdminId());
                            if (adminUser != null) {
                                com.app.zingbiteutils.EmailService.sendEmailAsync(
                                    adminUser.getUserID(),
                                    adminUser.getEmail(),
                                    "Restaurant Onboarding Status Update",
                                    "<h2>Restaurant Onboarding Request Update ❌</h2>"
                                    + "<p>Dear " + adminUser.getUserName() + ", thank you for your interest in partnering with ZingBite.</p>"
                                    + "<p>Unfortunately, your request to onboard <b>" + rr.getRestaurantName() + "</b> could not be approved at this time as it did not pass our credential verification check.</p>"
                                    + "<p>If you have questions, please reach out to support@zingbite.com.</p>"
                                );
                            }
                        }
                        
                        tx.commit();
                        resp.getWriter().write("{\"success\":true}");
                        // Broadcast approval/rejection event
                        try {
                            JsonObject sseMsg = new JsonObject();
                            sseMsg.addProperty("event", "request_reviewed");
                            sseMsg.addProperty("requestId", requestId);
                            sseMsg.addProperty("status", status);
                            com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastTopicUpdate("topic:admin_requests", sseMsg.toString());
                            com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastTopicUpdate("topic:user_orders:" + rr.getAdminId(), sseMsg.toString());
                        } catch (Exception ex) {
                            ex.printStackTrace();
                        }
                    } else {
                        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        resp.getWriter().write("{\"error\":\"Restaurant Request not found\"}");
                    }
                } catch (Exception e) {
                    if (tx != null) tx.rollback();
                    throw e;
                }

            } else if ("addRestaurant".equals(action)) {
                String name = requestBody.get("name").getAsString();
                String cuisine = requestBody.get("cuisine").getAsString();
                String address = requestBody.get("address").getAsString();
                String deliveryTime = requestBody.has("deliveryTime") ? requestBody.get("deliveryTime").getAsString() : "30 mins";
                String imagePath = requestBody.has("imagePath") ? requestBody.get("imagePath").getAsString() : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop";
                int adminId = requestBody.has("adminId") ? requestBody.get("adminId").getAsInt() : ((com.app.zingbitemodels.User) req.getSession().getAttribute("loggedInUser")).getUserID();

                Restaurant restaurant = new Restaurant(name, deliveryTime, cuisine, address, 4.5f, true, adminId, imagePath);

                // Geocode the restaurant address to get real coordinates
                double[] coords = geocodeAddress(address);
                if (coords != null) {
                    restaurant.setLatitude(coords[0]);
                    restaurant.setLongitude(coords[1]);
                    System.out.println("[SuperAdmin] Geocoded new restaurant '" + name + "' to: " + coords[0] + ", " + coords[1]);
                }

                try (Session hibernateSession = DBUtils.openSession()) {
                    tx = hibernateSession.beginTransaction();
                    hibernateSession.persist(restaurant);
                    tx.commit();
                    HomeServlet.restaurantCache.clear();
                    resp.getWriter().write("{\"success\":true}");
                } catch (Exception e) {
                    if (tx != null) tx.rollback();
                    throw e;
                }

            } else if ("addJob".equals(action)) {
                String title = requestBody.get("title").getAsString();
                String department = requestBody.get("department").getAsString();
                String location = requestBody.get("location").getAsString();
                String description = requestBody.get("description").getAsString();

                Job job = new Job(title, department, location, description, new SimpleDateFormat("MMMM dd, yyyy").format(new Date()));

                try (Session hibernateSession = DBUtils.openSession()) {
                    tx = hibernateSession.beginTransaction();
                    hibernateSession.persist(job);
                    tx.commit();
                    CareersServlet.jobsCache.clear();
                    resp.getWriter().write("{\"success\":true}");
                } catch (Exception e) {
                    if (tx != null) tx.rollback();
                    throw e;
                }

            } else if ("updateApplicationStatus".equals(action)) {
                int appId = requestBody.get("appId").getAsInt();
                String status = requestBody.get("status").getAsString();

                try (Session hibernateSession = DBUtils.openSession()) {
                    tx = hibernateSession.beginTransaction();
                    Application app = hibernateSession.get(Application.class, appId);
                    if (app != null) {
                        app.setStatus(status);
                        hibernateSession.merge(app);

                        // Query job title
                        Job job = hibernateSession.get(Job.class, app.getJobId());
                        String jobTitle = job != null ? job.getTitle() : "Position";

                        // Create simulated email notification
                        String subject = "Job Application Update: " + jobTitle;
                        String body = "Dear " + app.getCandidateName() + ",\n\n"
                                    + "We wanted to let you know that we have updated the status of your application for the "
                                    + jobTitle + " position. Your application is now in state: \"" + status + "\".\n\n"
                                    + "Should there be next steps, our recruitment team will get in touch with you shortly.\n\n"
                                    + "Best regards,\n"
                                    + "ZingBite Careers & Operations Team";

                EmailNotification note = new EmailNotification(
                    app.getUserId(),
                    app.getEmail(),
                    subject,
                    body,
                    "PENDING"
                );
                note.setSentDate(new SimpleDateFormat("MMMM dd, yyyy HH:mm").format(new Date()));
                        hibernateSession.persist(note);

                        // Send real email to candidate
                        com.app.zingbiteutils.EmailService.sendEmailAsync(
                            app.getUserId(),
                            app.getEmail(),
                            subject,
                            com.app.zingbiteutils.EmailTemplates.applicationStatusUpdate(app.getCandidateName(), jobTitle, status)
                        );

                        // If approved Delivery Rider, elevate role to delivery_partner and set riderStatus to Active
                        if (job != null && ("Delivery Rider".equalsIgnoreCase(job.getTitle()) || job.getTitle().toLowerCase().contains("rider")) && ("Offer Extended".equalsIgnoreCase(status) || "Approved".equalsIgnoreCase(status) || "Offered".equalsIgnoreCase(status))) {
                            User riderUser = hibernateSession.get(User.class, app.getUserId());
                            if (riderUser != null) {
                                riderUser.setRole("delivery_partner");
                                riderUser.setRiderStatus("Active");
                                hibernateSession.merge(riderUser);
                            }
                        }

                        tx.commit();
                        resp.getWriter().write("{\"success\":true}");
                    } else {
                        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        resp.getWriter().write("{\"error\":\"Application not found\"}");
                    }
                } catch (Exception e) {
                    if (tx != null) tx.rollback();
                    throw e;
                }

            } else if ("changeRiderStatus".equals(action)) {
                int targetUserId = requestBody.get("userId").getAsInt();
                String newRiderStatus = requestBody.get("riderStatus").getAsString(); // Active, Inactive, Suspended

                try (Session hibernateSession = DBUtils.openSession()) {
                    tx = hibernateSession.beginTransaction();
                    User targetUser = hibernateSession.get(User.class, targetUserId);
                    if (targetUser != null) {
                        targetUser.setRiderStatus(newRiderStatus);
                        if ("Active".equalsIgnoreCase(newRiderStatus)) {
                            targetUser.setRole("delivery_partner");
                        } else if ("Inactive".equalsIgnoreCase(newRiderStatus) || "Suspended".equalsIgnoreCase(newRiderStatus)) {
                            if ("delivery_partner".equals(targetUser.getRole())) {
                                targetUser.setRole("customer");
                            }
                        }
                        hibernateSession.merge(targetUser);
                        tx.commit();
                        resp.getWriter().write("{\"success\":true}");
                    } else {
                        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        resp.getWriter().write("{\"error\":\"User not found\"}");
                    }
                } catch (Exception e) {
                    if (tx != null) tx.rollback();
                    throw e;
                }

            } else if ("changeUserRole".equals(action)) {
                int targetUserId = requestBody.get("userId").getAsInt();
                String newRole = requestBody.get("role").getAsString();

                try (Session hibernateSession = DBUtils.openSession()) {
                    tx = hibernateSession.beginTransaction();
                    User targetUser = hibernateSession.get(User.class, targetUserId);
                    if (targetUser != null) {
                        targetUser.setRole(newRole);
                        hibernateSession.merge(targetUser);
                        tx.commit();

                        HttpSession session = req.getSession(false);
                        User current = (User) session.getAttribute("loggedInUser");
                        if (current != null && current.getUserID() == targetUserId) {
                            current.setRole(newRole);
                            session.setAttribute("loggedInUser", current);
                        }

                        resp.getWriter().write("{\"success\":true}");
                    } else {
                        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        resp.getWriter().write("{\"error\":\"User not found\"}");
                    }
                } catch (Exception e) {
                    if (tx != null) tx.rollback();
                    throw e;
                }
            } else if ("toggleBlockUser".equals(action)) {
                int targetUserId = requestBody.get("userId").getAsInt();

                try (Session hibernateSession = DBUtils.openSession()) {
                    tx = hibernateSession.beginTransaction();
                    User targetUser = hibernateSession.get(User.class, targetUserId);
                    if (targetUser != null) {
                        boolean isBlocked = targetUser.getBlocked() != null ? targetUser.getBlocked() : false;
                        targetUser.setBlocked(!isBlocked);
                        hibernateSession.merge(targetUser);
                        tx.commit();

                        JsonObject result = new JsonObject();
                        result.addProperty("success", true);
                        result.addProperty("blocked", !isBlocked);
                        resp.getWriter().write(result.toString());
                    } else {
                        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        resp.getWriter().write("{\"error\":\"User not found\"}");
                    }
                } catch (Exception e) {
                    if (tx != null) tx.rollback();
                    throw e;
                }
            } else if ("geocodeRestaurants".equals(action)) {
                // One-time backfill: geocode all restaurants that have NULL coordinates
                int geocoded = 0;
                int failed = 0;

                try (Session hibernateSession = DBUtils.openSession()) {
                    tx = hibernateSession.beginTransaction();
                    String hql = "from Restaurant where latitude is null or longitude is null";
                    Query<Restaurant> query = hibernateSession.createQuery(hql, Restaurant.class);
                    List<Restaurant> restaurants = query.list();

                    for (Restaurant r : restaurants) {
                        if (r.getAddress() != null && !r.getAddress().trim().isEmpty()) {
                            double[] coords = geocodeAddress(r.getAddress());
                            if (coords != null) {
                                r.setLatitude(coords[0]);
                                r.setLongitude(coords[1]);
                                hibernateSession.merge(r);
                                geocoded++;
                                System.out.println("[SuperAdmin] Backfill geocoded '" + r.getRestaurantName() + "' → " + coords[0] + ", " + coords[1]);

                                // Rate limit: Nominatim requires 1 request per second
                                try { Thread.sleep(1100); } catch (InterruptedException ie) { Thread.currentThread().interrupt(); }
                            } else {
                                failed++;
                            }
                        } else {
                            failed++;
                        }
                    }
                    tx.commit();
                } catch (Exception e) {
                    if (tx != null) tx.rollback();
                    throw e;
                }

                JsonObject result = new JsonObject();
                result.addProperty("success", true);
                result.addProperty("geocoded", geocoded);
                result.addProperty("failed", failed);
                resp.getWriter().write(result.toString());

            } else {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"error\":\"Invalid action\"}");
            }

        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"Operation failed\"}");
        }
    }

    /**
     * Geocodes an address string into [latitude, longitude] using the Nominatim API.
     * Returns null if geocoding fails or no results found.
     */
    private double[] geocodeAddress(String address) {
        if (address == null || address.trim().isEmpty()) return null;
        try {
            String encoded = URLEncoder.encode(address.trim(), "UTF-8");
            String apiUrl = "https://nominatim.openstreetmap.org/search?format=json&q=" + encoded + "&limit=1";
            
            HttpURLConnection conn = (HttpURLConnection) new URL(apiUrl).openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("User-Agent", "ZingBite/1.0");
            conn.setRequestProperty("Accept-Language", "en");
            conn.setConnectTimeout(5000);
            conn.setReadTimeout(5000);

            if (conn.getResponseCode() == 200) {
                InputStreamReader reader = new InputStreamReader(conn.getInputStream(), "UTF-8");
                com.google.gson.JsonArray results = JsonParser.parseReader(reader).getAsJsonArray();
                reader.close();
                
                if (results.size() > 0) {
                    JsonObject first = results.get(0).getAsJsonObject();
                    double lat = first.get("lat").getAsDouble();
                    double lon = first.get("lon").getAsDouble();
                    return new double[]{lat, lon};
                }
            }
            conn.disconnect();
        } catch (Exception e) {
            System.err.println("[SuperAdmin] Geocoding failed for address '" + address + "': " + e.getMessage());
        }
        return null;
    }
}
