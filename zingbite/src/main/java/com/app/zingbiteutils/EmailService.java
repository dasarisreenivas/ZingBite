package com.app.zingbiteutils;

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
        2, 2, 0L, TimeUnit.MILLISECONDS,
        new LinkedBlockingQueue<>(1000),
        new ThreadPoolExecutor.CallerRunsPolicy()
    );

    private static final String SMTP_HOST = "smtp.gmail.com";
    private static final String SMTP_PORT = "587";
    private static final String SMTP_USER = "test.zingbite@gmail.com"; // Configure as needed
    private static final String SMTP_PASS = "placeholder_pass";

    public static void shutdown() {
        System.out.println("[EmailService] Shutting down email executor pool...");
        executor.shutdown();
        try {
            if (!executor.awaitTermination(5, TimeUnit.SECONDS)) {
                executor.shutdownNow();
            }
            System.out.println("[EmailService] Email executor pool shut down successfully.");
        } catch (InterruptedException e) {
            executor.shutdownNow();
            Thread.currentThread().interrupt();
        }
    }

    public static void sendEmailAsync(final int userId, final String recipientEmail, final String subject, final String htmlBody) {
        executor.submit(new Runnable() {
            @Override
            public void run() {
                // 1. Initial Logging as PENDING in DB
                int notificationId = 0;
                EmailNotification notification = new EmailNotification(userId, recipientEmail, subject, htmlBody, "PENDING");
                
                try (org.hibernate.Session dbSession = DBUtils.openSession()) {
                    Transaction tx = dbSession.beginTransaction();
                    try {
                        dbSession.persist(notification);
                        tx.commit();
                        notificationId = notification.getId();
                    } catch (Exception e) {
                        if (tx != null && tx.isActive()) {
                            tx.rollback();
                        }
                        throw e;
                    }
                } catch (Exception e) {
                    System.err.println("[EmailService] Failed to log initial EmailNotification in DB: " + e.getMessage());
                }

                // 2. Check User Preference (Notifications Enabled)
                boolean notificationsEnabled = true;
                try (org.hibernate.Session dbSession = DBUtils.openSession()) {
                    User userObj = dbSession.get(User.class, userId);
                    // Future: check userObj notification preferences if field is added
                } catch (Exception e) {
                    System.err.println("[EmailService] Failed to fetch user preferences: " + e.getMessage());
                }

                if (!notificationsEnabled) {
                    updateStatus(notificationId, "DISABLED", null);
                    return;
                }

                // 3. Send the Email via SMTP
                try {
                    Properties props = new Properties();
                    props.put("mail.smtp.auth", "true");
                    props.put("mail.smtp.starttls.enable", "true");
                    props.put("mail.smtp.host", SMTP_HOST);
                    props.put("mail.smtp.port", SMTP_PORT);

                    Session session = Session.getInstance(props, new Authenticator() {
                        @Override
                        protected PasswordAuthentication getPasswordAuthentication() {
                            return new PasswordAuthentication(SMTP_USER, SMTP_PASS);
                        }
                    });

                    MimeMessage message = new MimeMessage(session);
                    message.setFrom(new InternetAddress(SMTP_USER, "ZingBite Operations"));
                    message.setRecipient(Message.RecipientType.TO, new InternetAddress(recipientEmail));
                    message.setSubject(subject);
                    message.setContent(htmlBody, "text/html; charset=utf-8");
                    message.setSentDate(new Date());

                    Transport.send(message);

                    // 4. Update DB status to SENT
                    String sentDateStr = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
                    updateStatus(notificationId, "SENT", sentDateStr);
                    System.out.println("[EmailService] Email sent successfully to " + recipientEmail);

                } catch (Exception e) {
                    System.err.println("[EmailService] Error sending email to " + recipientEmail + ": " + e.getMessage());
                    updateStatus(notificationId, "FAILED", null);
                }
            }
        });
    }

    /**
     * Updates the status of a persisted EmailNotification record.
     */
    private static void updateStatus(int notificationId, String status, String sentDate) {
        if (notificationId == 0) return;
        Transaction tx = null;
        try (org.hibernate.Session dbSession = DBUtils.openSession()) {
            tx = dbSession.beginTransaction();
            EmailNotification notif = dbSession.get(EmailNotification.class, notificationId);
            if (notif != null) {
                notif.setStatus(status);
                if (sentDate != null) notif.setSentDate(sentDate);
                dbSession.merge(notif);
            }
            tx.commit();
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            System.err.println("[EmailService] Failed to update notification status: " + e.getMessage());
        }
    }
}