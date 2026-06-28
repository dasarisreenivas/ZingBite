package com.app.zingbiteutils;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.hibernate.Session;
import java.util.List;
import com.app.zingbitemodels.User;

public class ScratchDBTest {
    private static final Logger LOGGER = LoggerFactory.getLogger(ScratchDBTest.class);

    public static void main(String[] args) {
        LOGGER.info("--- Scratch User Password Hashing Migration ---");
        try (Session session = DBUtils.openSession()) {
            org.hibernate.Transaction tx = session.beginTransaction();
            List<User> users = session.createQuery("from User", User.class).list();
            int migrated = 0;
            for (User u : users) {
                String pwd = u.getPassword();
                // Only values with no hash delimiter are known legacy plaintext.
                // PBKDF2 values (pbkdf2:salt:hash or salt:hash) must remain intact
                // until they can be upgraded after a successful login.
                if (pwd != null && !pwd.contains(":") && !pwd.startsWith("$argon2id$")) {
                    String hashed = PasswordUtils.hashPassword(pwd);
                    u.setPassword(hashed);
                    session.merge(u);
                    migrated++;
                    LOGGER.info("Migrated user: " + u.getEmail());
                }
            }
            tx.commit();
            LOGGER.info("Total users migrated: " + migrated);

            // Query specifically for the admin user to check status
            User admin = session.createQuery("from User where email = 'admin@zingbite.com'", User.class).uniqueResult();
            if (admin != null) {
                LOGGER.info("Admin details: ID=" + admin.getUserID()
                    + ", Email=" + admin.getEmail()
                    + ", Credential format=" + credentialFormat(admin.getPassword())
                    + ", Role=" + admin.getRole());
            } else {
                LOGGER.info("Admin user admin@zingbite.com not found!");
            }
        } catch (Exception e) {
            LOGGER.error("Unexpected error", e);
        }
    }

    private static String credentialFormat(String value) {
        if (value == null) return "missing";
        if (value.startsWith("argon2id:") || value.startsWith("$argon2id$")) return "argon2id";
        if (value.startsWith("pbkdf2:") || value.contains(":")) return "legacy-hash";
        return "plaintext";
    }
}
