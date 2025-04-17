package com.app.QLCH.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.QLCH.model.TaiKhoan;
import com.app.QLCH.request.DoiMatKhauRequest;
import com.app.QLCH.service.TaiKhoanService;
import com.app.QLCH.utils.HashUtil;

import java.util.List;

@RestController
@RequestMapping("/api/taikhoan")
public class TaiKhoanController {
    @Autowired
    private TaiKhoanService taiKhoanService;

    // API lấy danh sách tài khoản kích hoạt
    @GetMapping
    public List<TaiKhoan> getAllTaiKhoan() {
        return taiKhoanService.getAllTaiKhoan();
    }

    // API lấy tài khoản theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getTaiKhoanById(@PathVariable Integer id) {
        try {
            TaiKhoan taiKhoan = taiKhoanService.getTaiKhoanById(id);
            return ResponseEntity.ok(taiKhoan);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy tài khoản với ID: " + id);
        }
    }

    @PostMapping
    public ResponseEntity<?> saveTaiKhoan(@RequestBody TaiKhoan taiKhoan) {
        try {
            // Kiểm tra trùng tên đăng nhập
            if (taiKhoanService.existsByTenDangNhap(taiKhoan.getTenDangNhap())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Tên đăng nhập đã tồn tại!");
            }

            // Kiểm tra trùng email
            if (taiKhoanService.existsByEmail(taiKhoan.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Email đã tồn tại!");
            }

            taiKhoan.setMatKhau(HashUtil.hashString(taiKhoan.getMatKhau()));

            // Lưu tài khoản nếu không có lỗi
            return ResponseEntity.ok(taiKhoanService.saveTaiKhoan(taiKhoan));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi thêm tài khoản.");
        }
    }

    @PutMapping("/set-password/{id}")
    public ResponseEntity<?> updatePassword(@PathVariable Integer id, @RequestBody DoiMatKhauRequest request) {
        try {
            TaiKhoan existingTaiKhoan = taiKhoanService.getTaiKhoanById(id);
            if (existingTaiKhoan == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Không tìm thấy tài khoản với ID: " + id);
            }

            // So sánh mật khẩu cũ (mã hóa)
            String hashedOldPassword = HashUtil.hashString(request.getMatKhauCu());
            if (!existingTaiKhoan.getMatKhau().equals(hashedOldPassword)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Mật khẩu cũ không đúng.");
            }

            // Kiểm tra mật khẩu mới rỗng
            if (request.getMatKhauMoi() == null || request.getMatKhauMoi().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Mật khẩu mới không được để trống.");
            }

            // Mã hóa mật khẩu mới
            existingTaiKhoan.setMatKhau(HashUtil.hashString(request.getMatKhauMoi()));
            taiKhoanService.saveTaiKhoan(existingTaiKhoan);

            return ResponseEntity.ok("Cập nhật mật khẩu thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi cập nhật mật khẩu.");
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateTaiKhoan(@PathVariable Integer id, @RequestBody TaiKhoan taiKhoan) {
        try {
            // Kiểm tra xem tài khoản có tồn tại không
            TaiKhoan existingTaiKhoan = taiKhoanService.getTaiKhoanById(id);
            if (existingTaiKhoan == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Không tìm thấy tài khoản với ID: " + id);
            }

            // Kiểm tra trùng tên đăng nhập
            if (!existingTaiKhoan.getTenDangNhap().equals(taiKhoan.getTenDangNhap()) &&
                    taiKhoanService.existsByTenDangNhap(taiKhoan.getTenDangNhap())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Tên đăng nhập đã tồn tại!");
            }

            // Kiểm tra trùng email
            if (!existingTaiKhoan.getEmail().equals(taiKhoan.getEmail()) &&
                    taiKhoanService.existsByEmail(taiKhoan.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Email đã tồn tại!");
            }

            // Cập nhật thông tin tài khoản
            taiKhoan.setMaTaiKhoan(id); // Đảm bảo giữ nguyên ID
            taiKhoanService.saveTaiKhoan(taiKhoan);
            return ResponseEntity.ok("Cập nhật tài khoản thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi cập nhật tài khoản.");
        }
    }

    // API xóa mềm tài khoản
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTaiKhoanById(@PathVariable Integer id) {
        try {
            taiKhoanService.deleteTaiKhoanById(id);
            return ResponseEntity.ok("Xóa tài khoản thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi xóa tài khoản.");
        }
    }

    // API khóa tài khoản
    @PutMapping("/lock/{id}")
    public ResponseEntity<?> lockTaiKhoanById(@PathVariable Integer id) {
        try {
            TaiKhoan taiKhoan = taiKhoanService.getTaiKhoanById(id);
            if (taiKhoan.getTrangThai() == 1) {
                taiKhoanService.lockTaiKhoanById(id);
                return ResponseEntity.ok("Khóa tài khoản thành công!");
            } else if (taiKhoan.getTrangThai() == 2) {
                taiKhoanService.activateTaiKhoanById(id);
                return ResponseEntity.ok("Kích hoạt tài khoản thành công!");
            }
            return ResponseEntity.ok("Lỗi trạng thái tài khoản!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi khóa/kích hoạt tài khoản.");
        }
    }

    @GetMapping("/filter")
    public List<TaiKhoan> filterTaiKhoan(
            @RequestParam(required = false) String tenDangNhap,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) Integer maPhanQuyen,
            @RequestParam(required = false) Integer trangThai) {
        return taiKhoanService.filterTaiKhoan(tenDangNhap, email, maPhanQuyen, trangThai);
    }

}