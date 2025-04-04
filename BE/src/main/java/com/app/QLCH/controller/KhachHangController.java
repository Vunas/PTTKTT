package com.app.QLCH.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.app.QLCH.model.KhachHang;
import com.app.QLCH.service.KhachHangService;

@RestController
@RequestMapping("/api/khachhang")
public class KhachHangController {

    @Autowired
    private KhachHangService khachHangService;

    // API lấy danh sách khách hàng
    @GetMapping
    public List<KhachHang> getAllKhachHang() {
        return khachHangService.getAllKhachHang();
    }

    // API lấy thông tin khách hàng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getKhachHangById(@PathVariable Integer id) {
        try {
            KhachHang khachHang = khachHangService.getKhachHangById(id);
            return ResponseEntity.ok(khachHang);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy khách hàng với ID: " + id);
        }
    }

    // API thêm hoặc cập nhật thông tin khách hàng
    @PostMapping
    public ResponseEntity<?> saveKhachHang(@RequestBody KhachHang khachHang) {
        try {
            // Kiểm tra trùng email
            if (khachHangService.existsByEmail(khachHang.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email đã tồn tại!");
            }

            // Kiểm tra trùng số điện thoại
            if (khachHangService.existsBySoDienThoai(khachHang.getSoDienThoai())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Số điện thoại đã tồn tại!");
            }

            // Lưu khách hàng nếu không có lỗi
            return ResponseEntity.ok(khachHangService.saveKhachHang(khachHang));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi lưu khách hàng.");
        }
    }

    // API cập nhật thông tin khách hàng
    @PutMapping("/{id}")
    public ResponseEntity<?> updateKhachHang(@PathVariable Integer id, @RequestBody KhachHang khachHang) {
        try {
            // Kiểm tra xem khách hàng có tồn tại không
            KhachHang existingKhachHang = khachHangService.getKhachHangById(id);
            if (existingKhachHang == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy khách hàng với ID: " + id);
            }

            // Kiểm tra trùng email
            if (!existingKhachHang.getEmail().equals(khachHang.getEmail())
                    && khachHangService.existsByEmail(khachHang.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email đã tồn tại!");
            }

            // Kiểm tra trùng số điện thoại
            if (!existingKhachHang.getSoDienThoai().equals(khachHang.getSoDienThoai())
                    && khachHangService.existsBySoDienThoai(khachHang.getSoDienThoai())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Số điện thoại đã tồn tại!");
            }

            // Cập nhật thông tin khách hàng
            khachHang.setMaKhachHang(id); // Giữ nguyên ID
            khachHangService.saveKhachHang(khachHang);
            return ResponseEntity.ok("Cập nhật thông tin khách hàng thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi cập nhật khách hàng.");
        }
    }

    // API xóa mềm khách hàng
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteKhachHangById(@PathVariable Integer id) {
        try {
            khachHangService.deleteKhachHangById(id);
            return ResponseEntity.ok("Xóa khách hàng thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi xóa khách hàng với ID: " + id);
        }
    }

    // API lọc khách hàng
    @GetMapping("/filter")
    public List<KhachHang> filterKhachHang(
            @RequestParam(required = false) String hoTen,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String gioiTinh,
            @RequestParam(required = false) String soDienThoai,
            @RequestParam(required = false) String diaChi) {
        return khachHangService.filterKhachHang(hoTen, email, gioiTinh, soDienThoai, diaChi);
    }
}