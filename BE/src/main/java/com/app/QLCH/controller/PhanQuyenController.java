package com.app.QLCH.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.app.QLCH.model.PhanQuyen;
import com.app.QLCH.service.PhanQuyenService;

@RestController
@RequestMapping("/api/phanquyen")
public class PhanQuyenController {

    @Autowired
    private PhanQuyenService phanQuyenService;

    // API lấy danh sách quyền kích hoạt
    @GetMapping
    public List<PhanQuyen> getAllActiveQuyen() {
        return phanQuyenService.getAllActiveQuyen();
    }

    // API lấy quyền theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getQuyenById(@PathVariable Integer id) {
        try {
            PhanQuyen phanQuyen = phanQuyenService.getQuyenById(id);
            return ResponseEntity.ok(phanQuyen);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy quyền với ID: " + id);
        }
    }

    // API thêm hoặc cập nhật quyền
    @PostMapping
    public ResponseEntity<?> saveQuyen(@RequestBody PhanQuyen phanQuyen) {
        try {
            // Kiểm tra trùng tên quyền
            if (phanQuyenService.existsByTenQuyen(phanQuyen.getTenQuyen())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tên quyền đã tồn tại!");
            }

            // Lưu quyền nếu không có lỗi
            phanQuyenService.saveQuyen(phanQuyen);
            return ResponseEntity.ok("Lưu thông tin quyền thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi lưu quyền.");
        }
    }

    // API cập nhật thông tin quyền
    @PutMapping("/{id}")
    public ResponseEntity<?> updateQuyen(@PathVariable Integer id, @RequestBody PhanQuyen phanQuyen) {
        try {
            // Kiểm tra xem quyền có tồn tại không
            PhanQuyen existingPhanQuyen = phanQuyenService.getQuyenById(id);
            if (existingPhanQuyen == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy quyền với ID: " + id);
            }

            // Kiểm tra trùng tên quyền
            if (!existingPhanQuyen.getTenQuyen().equals(phanQuyen.getTenQuyen())
                    && phanQuyenService.existsByTenQuyen(phanQuyen.getTenQuyen())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tên quyền đã tồn tại!");
            }

            // Cập nhật thông tin quyền
            phanQuyen.setMaPhanQuyen(id); // Giữ nguyên ID
            phanQuyenService.saveQuyen(phanQuyen);
            return ResponseEntity.ok("Cập nhật thông tin quyền thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi cập nhật quyền.");
        }
    }

    // API xóa mềm quyền
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuyenById(@PathVariable Integer id) {
        try {
            phanQuyenService.deleteQuyenById(id);
            return ResponseEntity.ok("Xóa quyền thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi xóa quyền với ID: " + id);
        }
    }

    // API lọc quyền theo điều kiện
    @GetMapping("/filter")
    public List<PhanQuyen> filterQuyen(
            @RequestParam(required = false) String tenQuyen,
            @RequestParam(required = false) Integer trangThai) {
        return phanQuyenService.filterQuyen(tenQuyen, trangThai);
    }
}