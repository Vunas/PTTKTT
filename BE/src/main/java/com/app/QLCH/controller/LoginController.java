package com.app.QLCH.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.app.QLCH.service.TaiKhoanService;
import com.app.QLCH.utils.HashUtil;
import com.app.QLCH.model.TaiKhoan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginController {

    private static final String CLIENT_ID = "1041605160701-9q21rn06djjtsdlck5ks2mur96eckti0.apps.googleusercontent.com";

    @Autowired
    private TaiKhoanService taiKhoanService;

    // Đăng nhập bằng Google cho khách hàng
    @PostMapping("/login-customer")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> request) {
        String idTokenString = request.get("token");

        try {
            GoogleIdToken idToken = verifyGoogleToken(idTokenString);
            if (idToken != null) {
                String email = idToken.getPayload().getEmail();
                TaiKhoan taiKhoan = taiKhoanService.getTaiKhoanByemail(email);

                if (taiKhoan != null && taiKhoan.getMaPhanQuyen() == 1) {
                    return ResponseEntity.ok(taiKhoan);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email không tồn tại");
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token không hợp lệ");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi trong xử lý token: " + e.getMessage());
        }
    }

    @PostMapping("/login-customer-account")
    public ResponseEntity<?> accountCustomerLogin(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        try {
            TaiKhoan taiKhoan = taiKhoanService.getTaiKhoanByTenDangNhap(username);
            if (taiKhoan != null) {
                
                String hashedPassword = HashUtil.hashString(password);
                if (hashedPassword.equals(taiKhoan.getMatKhau())) {
                    if (taiKhoan.getMaPhanQuyen() != 2) {
                        return ResponseEntity.ok(taiKhoan);
                    } else {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Tài khoản không có quyền admin");
                    }
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mật khẩu không chính xác");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tên tài khoản không tồn tại");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi: " + e.getMessage());
        }
    }

    // Đăng nhập bằng Google cho admin
    @PostMapping("/login-admin-google")
    public ResponseEntity<?> googleAdminLogin(@RequestBody Map<String, String> request) {
        String idTokenString = request.get("token");

        try {
            GoogleIdToken idToken = verifyGoogleToken(idTokenString);
            if (idToken != null) {
                String email = idToken.getPayload().getEmail();
                TaiKhoan taiKhoan = taiKhoanService.getTaiKhoanByemail(email);
                
                if (taiKhoan != null && taiKhoan.getMaPhanQuyen() == 2) { // Quyền admin
                    return ResponseEntity.ok(taiKhoan);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email không hợp lệ hoặc không phải admin");
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token không hợp lệ");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi trong xử lý token: " + e.getMessage());
        }
    }

    // Đăng nhập admin bằng tài khoản
    @PostMapping("/login-admin-account")
    public ResponseEntity<?> accountAdminLogin(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");


        try {
            TaiKhoan taiKhoan = taiKhoanService.getTaiKhoanByTenDangNhap(username);
            if (taiKhoan != null) {
                String hashedPassword = HashUtil.hashString(password);
                if (hashedPassword.equals(taiKhoan.getMatKhau())) {
                    if (taiKhoan.getMaPhanQuyen() != 1) {
                        return ResponseEntity.ok(taiKhoan);
                    } else {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Tài khoản không có quyền admin");
                    }
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mật khẩu không chính xác");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tên tài khoản không tồn tại");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi: " + e.getMessage());
        }
    }

    // Tiện ích xác thực Google Token
    private GoogleIdToken verifyGoogleToken(String idTokenString) throws Exception {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(CLIENT_ID))
                .build();
        return verifier.verify(idTokenString);
    }
}