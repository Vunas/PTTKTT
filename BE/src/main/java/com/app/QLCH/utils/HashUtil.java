package com.app.QLCH.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class HashUtil {

    private static final String HASH_ALGORITHM = "SHA-256";

    // Hàm để hash chuỗi
    public static String hashString(String input) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance(HASH_ALGORITHM);
        byte[] hashBytes = digest.digest(input.getBytes());
        StringBuilder sb = new StringBuilder();
        for (byte b : hashBytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

    // Hàm để kiểm tra hash có khớp không
    public static boolean verifyHash(String input, String hash) throws NoSuchAlgorithmException {
        String hashedInput = hashString(input);
        System.out.println(hashedInput);
        return hashedInput.equals(hash);
    }
}
