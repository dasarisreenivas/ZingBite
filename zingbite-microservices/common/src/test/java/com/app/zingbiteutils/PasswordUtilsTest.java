package com.app.zingbiteutils;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class PasswordUtilsTest {
    @Test
    void verifiesArgon2ButRejectsPlaintextStorage() {
        String encoded = PasswordUtils.hashPassword("Correct Horse Battery Staple");

        assertTrue(PasswordUtils.verifyPassword("Correct Horse Battery Staple", encoded));
        assertFalse(PasswordUtils.verifyPassword("wrong", encoded));
        assertFalse(PasswordUtils.verifyPassword("legacy-password", "legacy-password"));
        assertFalse(PasswordUtils.needsRehash(encoded));
        assertTrue(PasswordUtils.needsRehash("pbkdf2:salt:hash"));
    }
}
