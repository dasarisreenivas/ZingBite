package com.app.zingbiteServlets;

import java.io.IOException;
import java.io.BufferedReader;
import java.util.List;
import java.util.ArrayList;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.hibernate.Session;
import com.app.zingbitedao.ReviewDAO;
import com.app.zingbitedaoimpl.ReviewDAOImplementation;
import com.app.zingbitemodels.Review;
import com.app.zingbitemodels.User;
import com.app.zingbiteutils.DBUtils;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/api/reviews")
public class ReviewServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String restIdStr = request.getParameter("restaurantId");
        if (restIdStr == null || restIdStr.trim().isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\":\"Missing restaurantId parameter\"}");
            return;
        }

        int restaurantId;
        try {
            restaurantId = Integer.parseInt(restIdStr);
        } catch (NumberFormatException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\":\"Invalid restaurantId parameter\"}");
            return;
        }

        try {
            ReviewDAO reviewDAO = new ReviewDAOImplementation();
            List<Review> reviews = reviewDAO.getReviewsByRestaurant(restaurantId);

            // Construct rich reviews JSON array with user names
            JsonArray reviewsArray = new JsonArray();
            try (Session session = DBUtils.openSession()) {
                for (Review r : reviews) {
                    JsonObject obj = new JsonObject();
                    obj.addProperty("id", r.getId());
                    obj.addProperty("userId", r.getUserId());
                    obj.addProperty("rating", r.getRating());
                    obj.addProperty("reviewText", r.getReviewText());
                    obj.addProperty("createdAt", r.getCreatedAt().toString());
                    if (r.getRestaurantReply() != null) {
                        obj.addProperty("restaurantReply", r.getRestaurantReply());
                    }
                    if (r.getRestaurantReplyAt() != null) {
                        obj.addProperty("restaurantReplyAt", r.getRestaurantReplyAt().toString());
                    }

                    // Get user details
                    User u = session.get(User.class, r.getUserId());
                    if (u != null) {
                        obj.addProperty("userName", u.getUserName());
                    } else {
                        obj.addProperty("userName", "Anonymous");
                    }
                    reviewsArray.add(obj);
                }
            }

            response.getWriter().write(reviewsArray.toString());
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\":\"An error occurred while fetching reviews\"}");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        HttpSession session = request.getSession(false);
        if (session == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\":\"Please log in to submit a review\"}");
            return;
        }

        User user = null;
        try {
            user = (User) session.getAttribute("loggedInUser");
        } catch (ClassCastException e) {
            try {
                session.invalidate();
            } catch (Exception ignored) {}
        }

        if (user == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\":\"Please log in to submit a review\"}");
            return;
        }

        JsonObject jsonResponse = new JsonObject();
        try {
            BufferedReader reader = request.getReader();
            JsonObject requestBody = JsonParser.parseReader(reader).getAsJsonObject();

            if (!requestBody.has("restaurantId") || !requestBody.has("rating") || !requestBody.has("reviewText")) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\":\"Missing required fields: restaurantId, rating, or reviewText\"}");
                return;
            }

            int restaurantId = requestBody.get("restaurantId").getAsInt();
            int rating = requestBody.get("rating").getAsInt();
            String reviewText = requestBody.get("reviewText").getAsString();

            if (rating < 1 || rating > 5) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\":\"Rating must be between 1 and 5\"}");
                return;
            }

            if (reviewText.trim().isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\":\"Review text cannot be empty\"}");
                return;
            }

            ReviewDAO reviewDAO = new ReviewDAOImplementation();

            // Validate that the user has a completed order from this restaurant
            boolean hasOrdered = reviewDAO.hasCompletedOrder(user.getUserID(), restaurantId);
            if (!hasOrdered) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.getWriter().write("{\"error\":\"You can only review restaurants from which you have completed orders\"}");
                return;
            }

            Review review = new Review(user.getUserID(), restaurantId, rating, reviewText);
            boolean added = reviewDAO.addReview(review);

            if (added) {
                jsonResponse.addProperty("success", true);
                jsonResponse.addProperty("message", "Review added successfully");
            } else {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                jsonResponse.addProperty("error", "Failed to save review");
            }
            response.getWriter().write(jsonResponse.toString());
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            jsonResponse.addProperty("error", "An error occurred: " + e.getMessage());
            response.getWriter().write(jsonResponse.toString());
        }
    }
}
