package com.app.zingbiteutils;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.app.zingbitemodels.AnalyticsEvent;

public class AnalyticsQueueManager {

    private static final AnalyticsQueueManager INSTANCE = new AnalyticsQueueManager();

    private final LinkedBlockingQueue<AnalyticsEvent> queue = new LinkedBlockingQueue<>();
    private final Thread workerThread;
    private volatile boolean running = true;

    private AnalyticsQueueManager() {
        this.workerThread = new Thread(this::processQueue, "AnalyticsBatchProcessor");
        this.workerThread.setDaemon(true);
        this.workerThread.start();
        System.out.println("[AnalyticsQueueManager] Telemetry background thread started.");
    }

    public static AnalyticsQueueManager getInstance() {
        return INSTANCE;
    }

    public void queueEvent(AnalyticsEvent event) {
        if (running) {
            queue.offer(event);
        } else {
            System.err.println("[AnalyticsQueueManager] Queue manager is stopped. Dropping event: " + event.getEventType());
        }
    }

    private void processQueue() {
        List<AnalyticsEvent> batch = new ArrayList<>();
        while (running || !queue.isEmpty()) {
            try {
                // Poll for new event up to 5 seconds
                AnalyticsEvent event = queue.poll(5, TimeUnit.SECONDS);
                if (event != null) {
                    batch.add(event);
                }

                // Trigger flush if batch is full, or poll timed out and batch has data, or system shutting down
                if (batch.size() >= 50 || (event == null && !batch.isEmpty()) || (!running && !batch.isEmpty())) {
                    flushBatch(batch);
                    batch.clear();
                }
            } catch (InterruptedException e) {
                System.out.println("[AnalyticsQueueManager] Thread interrupted, shutting down processor...");
                Thread.currentThread().interrupt();
                break;
            } catch (Exception e) {
                System.err.println("[AnalyticsQueueManager] Error in worker processing queue: " + e.getMessage());
                e.printStackTrace();
            }
        }
        
        // Final check to catch any leftover events after main loop exits
        if (!queue.isEmpty()) {
            List<AnalyticsEvent> remaining = new ArrayList<>();
            queue.drainTo(remaining);
            if (!remaining.isEmpty()) {
                flushBatch(remaining);
            }
        }
    }

    private synchronized void flushBatch(List<AnalyticsEvent> batch) {
        System.out.println("[AnalyticsQueueManager] Batch size " + batch.size() + " is flushing to database...");
        Transaction tx = null;
        try (Session session = DBUtils.openSession()) {
            tx = session.beginTransaction();
            for (AnalyticsEvent event : batch) {
                session.persist(event);
            }
            tx.commit();
            System.out.println("[AnalyticsQueueManager] Flush completed successfully.");
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            System.err.println("[AnalyticsQueueManager] Failed to write batch to database: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void shutdown() {
        System.out.println("[AnalyticsQueueManager] Stopping processor and flushing remaining events...");
        running = false;
        try {
            // Wait up to 8 seconds for the worker thread to exit gracefully
            workerThread.join(8000);
        } catch (InterruptedException e) {
            System.err.println("[AnalyticsQueueManager] Shutdown join interrupted.");
            Thread.currentThread().interrupt();
        }
        
        // Fallback: drain queue and force save remaining items directly if thread did not clean it
        if (!queue.isEmpty()) {
            List<AnalyticsEvent> remaining = new ArrayList<>();
            queue.drainTo(remaining);
            if (!remaining.isEmpty()) {
                flushBatch(remaining);
            }
        }
        System.out.println("[AnalyticsQueueManager] Telemetry pipeline offline.");
    }
}
