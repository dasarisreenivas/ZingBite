"package com.app.zingbiteutils;

import java.util.Date;
import java.util.Properties;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.hibernate.Transaction;
import com.app.zingbitemodels.EmailNotification;
import com.app.zingbitemodels.User;

public class EmailService {

    // Thread pool with bounded queue of 1000 tasks to prevent memory overload
    private static final ExecutorService executor = new ThreadPoolExecutor(
        2, 2, 0L, TimeUnit.MILLISECONDS, new LinkedBlockingQueue<>(1000)
    );

    public static void sendEmailAsync(final int userId, final String recipientEmail, final String subject, final String htmlBody) {
        executor.submit(new Runnable() {
            @Override
            public void run() {
                // 1. Initial Logging as PENDING in DB
                int notificationId = 0;
                EmailNotification notification = new EmailNotification(userId, recipientEmail, subject, htmlBody, "PENDING");
                
                try (org.hibernate.Session dbSession = DBUtils.openSession()) {
                    Transaction tx = dbSession.beginTransaction();
                    dbSession.persist(notification);
                    tx.commit();
                    notificationId = notification.getId();
                } catch (Exception e) {
                    System.err.println("[EmailService] Failed to log initial EmailNotification in DB: " + e.getMessage());
                }

                // 2. Check User Preference (Notifications Enabled)
                boolean notificationsEnabled = true;
                try (org.hibernat
<truncated 6790 bytes>