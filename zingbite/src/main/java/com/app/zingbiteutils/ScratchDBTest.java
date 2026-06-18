package com.app.zingbiteutils;

import org.hibernate.Session;
import java.util.List;
import com.app.zingbitemodels.User;

public class ScratchDBTest {
    public static void main(String[] args) {
        System.out.println("--- Scratch User Test ---");
        try (Session session = DBUtils.openSession()) {
            List<User> users = session.createQuery("from User", User.class).list();
            System.out.println("Found " + users.size() + " users:");
            for (User u : users) {
                System.out.println("User ID: " + u.getUserID() 
                    + ", Name: " + u.getUserName()
                    + ", Email: " + u.getEmail()
                    + ", Password: " + u.getPassword()
                    + ", Role: " + u.getRole());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
