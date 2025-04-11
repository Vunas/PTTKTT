package com.app.QLCH.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.QLCH.model.KhuyenMai;
import com.app.QLCH.service.KhuyenMaiService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/khuyenmai")
public class KhuyenMaiController {
    @Autowired
    private KhuyenMaiService khuyenMaiService;

    // API lấy danh sách khuyến mãi còn hoạt động
    @GetMapping
    public List<KhuyenMai> getAllKhuyenMai() {
        return khuyenMaiService.getAllKhuyenMai();
    }

    // API lấy thông tin khuyến mãi theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getKhuyenMaiById(@PathVariable Integer id) {
        try {
            KhuyenMai khuyenMai = khuyenMaiService.getKhuyenMaiById(id);
            return ResponseEntity.ok(khuyenMai);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy khuyến mãi với ID: " + id);
        }
    }

    // API thêm khuyến mãi
    @PostMapping
    public ResponseEntity<?> saveKhuyenMai(@RequestBody KhuyenMai khuyenMai) {
        try {
            // Kiểm tra trùng tên khuyến mãi
            if (khuyenMaiService.existsByTenKhuyenMai(khuyenMai.getTenKhuyenMai())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Tên khuyến mãi đã tồn tại!");
            }
            return ResponseEntity.ok(khuyenMaiService.saveKhuyenMai(khuyenMai));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi thêm khuyến mãi.");
        }
    }

    // API cập nhật khuyến mãi
    @PutMapping("/{id}")
    public ResponseEntity<?> updateKhuyenMai(@PathVariable Integer id, @RequestBody KhuyenMai khuyenMai) {
        try {
            KhuyenMai existingKhuyenMai = khuyenMaiService.getKhuyenMaiById(id);
            if (existingKhuyenMai == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Không tìm thấy khuyến mãi với ID: " + id);
            }

            // Kiểm tra trùng tên khuyến mãi
            if (!existingKhuyenMai.getTenKhuyenMai().equals(khuyenMai.getTenKhuyenMai()) &&
                    khuyenMaiService.existsByTenKhuyenMai(khuyenMai.getTenKhuyenMai())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Tên khuyến mãi đã tồn tại!");
            }

            khuyenMai.setMaKhuyenMai(id); // Đảm bảo giữ nguyên ID
            khuyenMaiService.saveKhuyenMai(khuyenMai);
            return ResponseEntity.ok("Cập nhật khuyến mãi thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi cập nhật khuyến mãi.");
        }
    }

    // API xóa mềm khuyến mãi
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteKhuyenMaiById(@PathVariable Integer id) {
        try {
            khuyenMaiService.deleteKhuyenMaiById(id);
            return ResponseEntity.ok("Xóa khuyến mãi thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi xóa khuyến mãi.");
        }
    }

    @PutMapping("/lock/{id}")
    public ResponseEntity<?> lockKhuyenMaiById(@PathVariable Integer id) {
        try {
            KhuyenMai khuyenMai = khuyenMaiService.getKhuyenMaiById(id);
            if (khuyenMai != null) {
                if (khuyenMai.getTrangThai() == 1) {
                    khuyenMaiService.lockKhuyenMaiById(id);
                    return ResponseEntity.ok("Khuyến mãi đã bị khóa!");
                } else if (khuyenMai.getTrangThai() == 2) {
                    khuyenMaiService.activateKhuyenMaiById(id);
                    return ResponseEntity.ok("Khuyến mãi đã được kích hoạt lại!");
                } else {
                    return ResponseEntity.badRequest().body("Trạng thái không hợp lệ!");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Không tìm thấy khuyến mãi với ID: " + id);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi xử lý khóa/kích hoạt khuyến mãi.");
        }
    }

    // API lọc khuyến mãi
    @GetMapping("/filter")
    public List<KhuyenMai> filterKhuyenMai(
            @RequestParam(required = false) String tenKhuyenMai,
            @RequestParam(required = false) Integer loaiKhuyenMai,
            @RequestParam(required = false) Integer trangThai,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate ngayBatDau,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate ngayKetThuc) {
        return khuyenMaiService.filterKhuyenMai(tenKhuyenMai, loaiKhuyenMai, trangThai, ngayBatDau, ngayKetThuc);
    }

}
