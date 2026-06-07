package com.app.zingbiteServlets;

import jakarta.servlet.AsyncContext;
import jakarta.servlet.AsyncEvent;
import jakarta.servlet.AsyncListener;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import com.app.zingbiteutils.OrderEventBroker;

@WebServlet(urlPatterns = "/api/order/stream", asyncSupported = true)
public class OrderTrackingSSEServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/event-stream");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Connection", "keep-alive");
        response.setHeader("Access-Control-Allow-Origin", "*");

        String orderIdParam = request.getParameter("orderId");
        if (orderIdParam == null || orderIdParam.trim().isEmpty()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing orderId");
            return;
        }

        final int orderId;
        try {
            orderId = Integer.parseInt(orderIdParam.replace("ZB-", "").trim());
        } catch (NumberFormatException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid orderId");
            return;
        }

        final AsyncContext asyncContext = request.startAsync();
        asyncContext.setTimeout(0); // Infinite timeout for long-lived SSE connections

        final PrintWriter writer = response.getWriter();

        // Send initial connection establishment packet
        writer.write("event: connected\ndata: {}\n\n");
        writer.flush();

        final OrderEventBroker.SSEListener listener = new OrderEventBroker.SSEListener() {
            @Override
            public void onUpdate(String data) {
                synchronized (writer) {
                    writer.write("data: " + data + "\n\n");
                    writer.flush();
                }
            }
        };

        // Add listener to the event broker
        OrderEventBroker.getInstance().addListener(orderId, listener);

        // Remove listener when connection ends
        asyncContext.addListener(new AsyncListener() {
            @Override
            public void onComplete(AsyncEvent event) throws IOException {
                OrderEventBroker.getInstance().removeListener(orderId, listener);
            }

            @Override
            public void onTimeout(AsyncEvent event) throws IOException {
                OrderEventBroker.getInstance().removeListener(orderId, listener);
                asyncContext.complete();
            }

            @Override
            public void onError(AsyncEvent event) throws IOException {
                OrderEventBroker.getInstance().removeListener(orderId, listener);
                asyncContext.complete();
            }

            @Override
            public void onStartAsync(AsyncEvent event) throws IOException {
            }
        });
    }
}
