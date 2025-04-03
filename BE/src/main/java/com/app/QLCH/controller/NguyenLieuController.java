package com.app.QLCH.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.app.QLCH.model.NguyenLieu;
import com.app.QLCH.service.NguyenLieuService;

@RestController
@RequestMapping("/api/nguyenlieu")
public class NguyenLieuController {

    @Autowired
    private NguyenLieuService nguyenLieuService;

    // API lấy danh sách tất cả nguyên liệu
    @GetMapping
    public List<NguyenLieu> getAllNguyenLieu() {
        return nguyenLieuService.getAllNguyenLieu();
    }

    // API lấy thông tin nguyên liệu theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getNguyenLieuById(@PathVariable Integer id) {
        try {
            NguyenLieu nguyenLieu = nguyenLieuService.getNguyenLieuById(id);
            if (nguyenLieu != null) {
                return ResponseEntity.ok(nguyenLieu);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy nguyên liệu với ID: " + id);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra.");
        }
    }

    // API thêm thông tin nguyên liệu
    @PostMapping
    public ResponseEntity<?> saveNguyenLieu(@RequestBody NguyenLieu nguyenLieu) {
        try {
            // Kiểm tra trùng tên nguyên liệu
            if (nguyenLieuService.existsByTen(nguyenLieu.getTen())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nguyên liệu với tên này đã tồn tại!");
            }

            // Lưu nguyên liệu nếu không có lỗi
            nguyenLieuService.saveNguyenLieu(nguyenLieu);
            return ResponseEntity.ok("Thêm nguyên liệu thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi thêm nguyên liệu.");
        }
    }

    // API cập nhật thông tin nguyên liệu
    @PutMapping("/{id}")
    public ResponseEntity<?> updateNguyenLieu(@PathVariable Integer id, @RequestBody NguyenLieu nguyenLieu) {
        try {
            // Kiểm tra xem nguyên liệu có tồn tại hay không
            NguyenLieu existingNguyenLieu = nguyenLieuService.getNguyenLieuById(id);
            if (existingNguyenLieu == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy nguyên liệu với ID: " + id);
            }

            // Kiểm tra trùng tên nếu khác tên ban đầu
            if (!existingNguyenLieu.getTen().equals(nguyenLieu.getTen()) && nguyenLieuService.existsByTen(nguyenLieu.getTen())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nguyên liệu với tên này đã tồn tại!");
            }

            // Cập nhật thông tin nguyên liệu
            nguyenLieu.setMaNguyenLieu(id); // Giữ nguyên ID
            nguyenLieuService.saveNguyenLieu(nguyenLieu);
            return ResponseEntity.ok("Cập nhật nguyên liệu thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi cập nhật nguyên liệu.");
        }
    }

    // API xóa nguyên liệu
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNguyenLieuById(@PathVariable Integer id) {
        try {
            nguyenLieuService.deleteNguyenLieuById(id);
            return ResponseEntity.ok("Xóa nguyên liệu thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi xóa nguyên liệu.");
        }
    }

    // API lọc nguyên liệu với nhiều tiêu chí
    @GetMapping("/filter")
    public List<NguyenLieu> filterNguyenLieu(
            @RequestParam(required = false) String ten,
            @RequestParam(required = false) String donVi,
            @RequestParam(required = false) Double giaNhapMin,
            @RequestParam(required = false) Double giaNhapMax,
            @RequestParam(required = false) Integer soLuongMin,
            @RequestParam(required = false) Integer soLuongMax) {
        return nguyenLieuService.filterNguyenLieu(ten, donVi, giaNhapMin, giaNhapMax, soLuongMin, soLuongMax);
    }
}
