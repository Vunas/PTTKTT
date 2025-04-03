package com.app.QLCH.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.app.QLCH.service.TaiKhoanService;
import com.app.QLCH.model.TaiKhoan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginController {

    private static final String CLIENT_ID = "1041605160701-9q21rn06djjtsdlck5ks2mur96eckti0.apps.googleusercontent.com"; // Client ID Google
    @Autowired
    private TaiKhoanService taiKhoanService;

    @PostMapping("/login-custumer")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> request) {
        String idTokenString = request.get("token");

        try {
            // Xác thực token với Google
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(),
                    new GsonFactory())
                    .setAudience(Collections.singletonList(CLIENT_ID))
                    .build();

            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                String email = idToken.getPayload().getEmail(); // Lấy email từ token

                // Kiểm tra email trong cơ sở dữ liệu
                TaiKhoan taiKhoan= taiKhoanService.getTaiKhoanByemail(email);
                if (taiKhoan != null && taiKhoan.getMaPhanQuyen() == 1) {
                    return ResponseEntity.ok(taiKhoan);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email không tồn tại");
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token không hợp lệ");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi trong xử lý token: " + e.getMessage());
        }
    }

    @PostMapping("/login-admin")
public ResponseEntity<?> googleAdminLogin(@RequestBody Map<String, String> request) {
    String idTokenString = request.get("token");

    try {
        // Xác thực token với Google
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(),
                new GsonFactory())
                .setAudience(Collections.singletonList(CLIENT_ID))
                .build();

        GoogleIdToken idToken = verifier.verify(idTokenString);
        if (idToken != null) {
            String email = idToken.getPayload().getEmail(); // Lấy email từ token

            // Kiểm tra email trong cơ sở dữ liệu
            TaiKhoan taiKhoan = taiKhoanService.getTaiKhoanByemail(email);
            if (taiKhoan != null && taiKhoan.getMaPhanQuyen() != 1) { // Phân quyền cho admin
                return ResponseEntity.ok(taiKhoan);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email không hợp lệ hoặc không phải admin");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token không hợp lệ");
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Lỗi trong xử lý token: " + e.getMessage());
    }
}

}