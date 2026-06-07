package com.app.zingbiteutils;

import org.bouncycastle.crypto.generators.Argon2BytesGenerator;
import org.bouncycastle.crypto.params.Argon2Parameters;
import java.security.SecureRandom;
import java.security.MessageDigest;
import java.util.Base64;
import java.nio.charset.StandardCharsets;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

public class PasswordUtils {
    // OWASP Recommended parameters for Argon2id
    private static final int ARGON2_MEMORY_KB = 46080; // 45 MiB
    private static final int ARGON2_ITERATIONS = 1;
    private static final int ARGON2_PARALLELISM = 1;
    private static final int ARGON2_SALT_LENGTH = 16; // bytes
    private static final int ARGON2_HASH_LENGTH = 32; // bytes

    // Legacy PBKDF2 parameters for backward-compatible login verification
    private static final int PBKDF2_ITERATIONS = 10000;
    private static final int PBKDF2_KEY_LENGTH = 256;

    /**
     * Hashes the given plain text password using Argon2id with a random salt.
     * Returns a string formatted as "argon2id:base64_salt:base64_hash".
     */
    public static String hashPassword(String password) {
        if (password == null) return null;
        try {
            SecureRandom sr = new SecureRandom();
            byte[] salt = new byte[ARGON2_SALT_LENGTH];
            sr.nextBytes(salt);

            Argon2Parameters params = new Argon2Parameters.Builder(Argon2Parameters.ARGON2_id)
                .withVersion(Argon2Parameters.ARGON2_VERSION_13)
                .withIterations(ARGON2_ITERATIONS)
                .withMemoryAsKB(ARGON2_MEMORY_KB)
                .withParallelism(ARGON2_PARALLELISM)
                .withSalt(salt)
                .build();

            Argon2BytesGenerator gen = new Argon2BytesGenerator();
            gen.init(params);

            byte[] hash = new byte[ARGON2_HASH_LENGTH];
            gen.generateBytes(password.getBytes(StandardCharsets.UTF_8), hash);

            return "argon2id:" + Base64.getEncoder().encodeToString(salt) + ":" + Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }

    /**
     * Verifies the given plain text password against a stored hashed password.
     * Supports legacy PBKDF2 formats and plain-text fallback.
     */
    public static boolean verifyPassword(String password, String storedPassword) {
        if (password == null || storedPassword == null) return false;

        // 1. Plaintext fallback (legacy users)
        if (!storedPassword.contains(":")) {
            return password.equals(storedPassword);
        }

        String[] parts = storedPassword.split(":");

        // 2. Argon2id verification
        if ("argon2id".equals(parts[0])) {
            if (parts.length != 3) return false;
            try {
                byte[] salt = Base64.getDecoder().decode(parts[1]);
                byte[] storedHash = Base64.getDecoder().decode(parts[2]);

                Argon2Parameters params = new Argon2Parameters.Builder(Argon2Parameters.ARGON2_id)
                    .withVersion(Argon2Parameters.ARGON2_VERSION_13)
                    .withIterations(ARGON2_ITERATIONS)
                    .withMemoryAsKB(ARGON2_MEMORY_KB)
                    .withParallelism(ARGON2_PARALLELISM)
                    .withSalt(salt)
                    .build();

                Argon2BytesGenerator gen = new Argon2BytesGenerator();
                gen.init(params);

                byte[] hash = new byte[ARGON2_HASH_LENGTH];
                gen.generateBytes(password.getBytes(StandardCharsets.UTF_8), hash);

                return MessageDigest.isEqual(storedHash, hash);
            } catch (Exception e) {
                return false;
            }
        }

        // 3. PBKDF2 verification (legacy hashed format)
        try {
            byte[] salt;
            byte[] storedHash;
            if ("pbkdf2".equals(parts[0])) {
                if (parts.length != 3) return false;
                salt = Base64.getDecoder().decode(parts[1]);
                storedHash = Base64.getDecoder().decode(parts[2]);
            } else {
                if (parts.length != 2) return false;
                salt = Base64.getDecoder().decode(parts[0]);
                storedHash = Base64.getDecoder().decode(parts[1]);
            }

            PBEKeySpec spec = new PBEKeySpec(password.toCharArray(), salt, PBKDF2_ITERATIONS, PBKDF2_KEY_LENGTH);
            SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
            byte[] hash = skf.generateSecret(spec).getEncoded();

            return MessageDigest.isEqual(storedHash, hash);
        } catch (Exception e) {
            return false;
        }
    }
}