package com.app.zingbiteServlets;

import jakarta.servlet.AsyncContext;
import jakarta.servlet.AsyncEvent;
import jakarta.servlet.AsyncListener;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import org.hibernate.Session;
import org.hibernate.query.Query;

import com.app.zingbiteutils.DBUtils;
import com.app.zingbiteutils.OrderEventBroker;
import com.app.zingbitemodels.Restaurant;
import com.app.zingbitemodels.User;

@WebServlet(urlPatterns = "/api/stream", asyncSupported = true)
public class GlobalSSEServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    private static final Set<PrintWriter> activeWriters = ConcurrentHashMap.newKeySet();
    private static final ScheduledExecutorService heartbeatScheduler = Executors.newSingleThreadScheduledExecutor(runnable -> {
        Thread thread = new Thread(runnable, "SSE-Heartbeat");
        thread.setDaemon(true);
        return thread;
    });

    static {
        heartbeatScheduler.scheduleAtFixedRate(() -> {
            for (PrintWriter writer : activeWriters) {
                try {
                    synchronized (writer) {
                        writer.write(":\n\n");
                        writer.flush();
                    }
                } catch (Exception e) {
                    activeWriters.remove(writer);
                }
            }
        }, 15, 15, TimeUnit.SECONDS);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/event-stream");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Connection", "keep-alive");
        response.setHeader("Access-Control-Allow-Origin", "*");

        HttpSession session = request.getSession(false);
        User user = null;
        if (session != null) {
            user = (User) session.getAttribute("loggedInUser");
        }

        String topicParam = request.getParameter("topic");
        if (topicParam == null || topicParam.trim().isEmpty()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing topic");
            return;
        }

        final List<String> topicsToSubscribe = new ArrayList<>();

        if ("rider_orders".equalsIgnoreCase(topicParam)) {
            topicsToSubscribe.add("topic:rider_orders");
            if (user != null && "delivery_partner".equals(user.getRole())) {
                topicsToSubscribe.add("topic:rider_orders:" + user.getUserID());
            }
        } else if ("restaurant_orders".equalsIgnoreCase(topicParam)) {
            String restIdParam = request.getParameter("restaurantId");
            int restId = 0;
            if (restIdParam != null && !restIdParam.trim().isEmpty()) {
                try { restId = Integer.parseInt(restIdParam); } catch (Exception e) {}
            }
            if (restId == 0 && user != null && "restaurant_admin".equals(user.getRole())) {
                restId = getRestaurantIdForAdmin(user.getUserID());
            }
            if (restId > 0) {
                topicsToSubscribe.add("topic:restaurant_orders:" + restId);
            }
            topicsToSubscribe.add("topic:new_orders");
        } else if ("admin_requests".equalsIgnoreCase(topicParam)) {
            if (user != null && "super_admin".equals(user.getRole())) {
                topicsToSubscribe.add("topic:admin_requests");
            } else {
                response.sendError(HttpServletResponse.SC_FORBIDDEN, "Forbidden");
                return;
            }
        } else if ("user_orders".equalsIgnoreCase(topicParam)) {
            if (user != null) {
                topicsToSubscribe.add("topic:user_orders:" + user.getUserID());
            } else {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                return;
            }
        } else if ("menu".equalsIgnoreCase(topicParam)) {
            String restIdParam = request.getParameter("restaurantId");
            if (restIdParam != null && !restIdParam.trim().isEmpty()) {
                topicsToSubscribe.add("topic:menu:" + restIdParam.trim());
            }
        } else {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid topic name");
            return;
        }

        final AsyncContext asyncContext = request.startAsync();
        asyncContext.setTimeout(0); // Infinite timeout

        final PrintWriter writer = response.getWriter();
        activeWriters.add(writer);

        // Send initial connection packet
        synchronized (writer) {
            writer.write("event: connected\ndata: {}\n\n");
            writer.flush();
        }

        final OrderEventBroker.SSEListener listener = new OrderEventBroker.SSEListener() {
            @Override
            public void onUpdate(String data) {
                synchronized (writer) {
                    writer.write("data: " + data + "\n\n");
                    writer.flush();
                }
            }
        };

        // Register to all resolved topics
        for (String topic : topicsToSubscribe) {
            OrderEventBroker.getInstance().addTopicListener(topic, listener);
        }

        asyncContext.addListener(new AsyncListener() {
            private void cleanUp() {
                activeWriters.remove(writer);
                for (String topic : topicsToSubscribe) {
                    OrderEventBroker.getInstance().removeTopicListener(topic, listener);
                }
            }

            @Override
            public void onComplete(AsyncEvent event) throws IOException {
                cleanUp();
            }

            @Override
            public void onTimeout(AsyncEvent event) throws IOException {
                cleanUp();
                asyncContext.complete();
            }

            @Override
            public void onError(AsyncEvent event) throws IOException {
                cleanUp();
                asyncContext.complete();
            }

            @Override
            public void onStartAsync(AsyncEvent event) throws IOException {
            }
        });
    }

    private int getRestaurantIdForAdmin(int adminUserId) {
        try (Session hibernateSession = DBUtils.openSession()) {
            String rHql = "from Restaurant where adminId = :adminId";
            Query<Restaurant> rQuery = hibernateSession.createQuery(rHql, Restaurant.class);
            rQuery.setParameter("adminId", adminUserId);
            Restaurant restaurant = rQuery.uniqueResult();
            if (restaurant != null) {
                return restaurant.getRestaurantId();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public void destroy() {
        try {
            heartbeatScheduler.shutdown();
        } catch (Exception e) {}
        super.destroy();
    }
}
