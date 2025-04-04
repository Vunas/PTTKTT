package com.app.QLCH.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.app.QLCH.model.KhoHang;
import com.app.QLCH.service.KhoHangService;

@RestController
@RequestMapping("/api/khohang")
public class KhoHangController {

    @Autowired
    private KhoHangService khoHangService;

    // API lấy danh sách kho hàng
    @GetMapping
    public List<KhoHang> getAllKhoHang() {
        return khoHangService.getAllKhoHang();
    }

    // API lấy thông tin kho hàng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getKhoHangById(@PathVariable Integer id) {
        try {
            KhoHang khoHang = khoHangService.getKhoHangById(id);
            return ResponseEntity.ok(khoHang);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy kho hàng với ID: " + id);
        }
    }

    // API thêm mới hoặc cập nhật kho hàng
    @PostMapping
    public ResponseEntity<?> saveKhoHang(@RequestBody KhoHang khoHang) {
        try {
            // Kiểm tra trùng tên kho hàng
            if (khoHangService.existsByTenKhoHang(khoHang.getTenKhoHang())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tên kho hàng đã tồn tại!");
            }

            // Lưu kho hàng
            return ResponseEntity.ok(khoHangService.saveKhoHang(khoHang));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi lưu kho hàng.");
        }
    }

    // API cập nhật thông tin kho hàng
    @PutMapping("/{id}")
    public ResponseEntity<?> updateKhoHang(@PathVariable Integer id, @RequestBody KhoHang khoHang) {
        try {
            // Kiểm tra xem kho hàng có tồn tại không
            KhoHang existingKhoHang = khoHangService.getKhoHangById(id);
            if (existingKhoHang == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy kho hàng với ID: " + id);
            }

            // Kiểm tra trùng tên kho hàng
            if (!existingKhoHang.getTenKhoHang().equals(khoHang.getTenKhoHang())
                    && khoHangService.existsByTenKhoHang(khoHang.getTenKhoHang())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tên kho hàng đã tồn tại!");
            }

            // Cập nhật thông tin kho hàng
            khoHang.setMaKhoHang(id); // Giữ nguyên ID
            khoHangService.saveKhoHang(khoHang);
            return ResponseEntity.ok("Cập nhật thông tin kho hàng thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi cập nhật kho hàng.");
        }
    }

    // API xóa mềm kho hàng
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteKhoHangById(@PathVariable Integer id) {
        try {
            khoHangService.deleteKhoHangById(id);
            return ResponseEntity.ok("Xóa kho hàng thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi xóa kho hàng với ID: " + id);
        }
    }

    // API lọc kho hàng
    @GetMapping("/filter")
    public List<KhoHang> filterKhoHang(
            @RequestParam(required = false) String tenKhoHang,
            @RequestParam(required = false) String diaDiem) {
        return khoHangService.filterKhoHang(tenKhoHang, diaDiem);
    }
}
