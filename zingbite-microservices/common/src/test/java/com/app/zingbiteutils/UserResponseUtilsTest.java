package com.app.zingbiteutils;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

import org.junit.jupiter.api.Test;

import com.app.zingbitemodels.User;
import com.google.gson.JsonObject;

class UserResponseUtilsTest {
    @Test
    void omitsPasswordFromPublicUserJson() {
        User user = new User("Ada", "ada@example.com", "argon2id:salt:hash", 9000000000L, "Home");
        user.setUserID(42);
        user.setRole("customer");

        JsonObject json = UserResponseUtils.toJson(user);

        assertEquals(42, json.get("userID").getAsInt());
        assertEquals("ada@example.com", json.get("email").getAsString());
        assertFalse(json.has("password"));
    }
}
