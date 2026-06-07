"package com.app.zingbiteutils;

import org.bouncycastle.crypto.generators.Argon2BytesGenerator;
import org.bouncycastle.crypto.params.Argon2Parameters;
import java.security.SecureRandom;
import java.security.MessageDigest;
import java.util.Base64;
import java.nio.charset.StandardCharsets;

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

            return "argon2id:" + Base64.getEncoder().encodeToString(salt) + ":" + Base64.getEncoder().encodeToStri
<truncated 3013 bytes>