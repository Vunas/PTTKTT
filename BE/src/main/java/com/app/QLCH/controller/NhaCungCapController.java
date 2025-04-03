package com.app.QLCH.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.app.QLCH.model.NhaCungCap;
import com.app.QLCH.service.NhaCungCapService;

@RestController
@RequestMapping("/api/nhacungcap")
public class NhaCungCapController {

    @Autowired
    private NhaCungCapService nhaCungCapService;

    // API lấy danh sách nhà cung cấp
    @GetMapping
    public List<NhaCungCap> getAllNhaCungCap() {
        return nhaCungCapService.getAllNhaCungCap();
    }

    // API lấy thông tin nhà cung cấp theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getNhaCungCapById(@PathVariable Integer id) {
        try {
            NhaCungCap nhaCungCap = nhaCungCapService.getNhaCungCapById(id);
            return ResponseEntity.ok(nhaCungCap);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy nhà cung cấp với ID: " + id);
        }
    }

    // API thêm hoặc cập nhật thông tin nhà cung cấp
    @PostMapping
    public ResponseEntity<?> saveNhaCungCap(@RequestBody NhaCungCap nhaCungCap) {
        try {
            // Kiểm tra trùng email
            if (nhaCungCapService.existsByEmail(nhaCungCap.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email đã tồn tại!");
            }

            // Kiểm tra trùng số điện thoại
            if (nhaCungCapService.existsBySoDienThoai(nhaCungCap.getSoDienThoai())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Số điện thoại đã tồn tại!");
            }

            // Lưu nhà cung cấp nếu không có lỗi
            nhaCungCapService.saveNhaCungCap(nhaCungCap);
            return ResponseEntity.ok("Lưu thông tin nhà cung cấp thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi lưu nhà cung cấp.");
        }
    }

    // API cập nhật thông tin nhà cung cấp
    @PutMapping("/{id}")
    public ResponseEntity<?> updateNhaCungCap(@PathVariable Integer id, @RequestBody NhaCungCap nhaCungCap) {
        try {
            // Kiểm tra xem nhà cung cấp có tồn tại không
            NhaCungCap existingNhaCungCap = nhaCungCapService.getNhaCungCapById(id);
            if (existingNhaCungCap == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy nhà cung cấp với ID: " + id);
            }

            // Kiểm tra trùng email
            if (!existingNhaCungCap.getEmail().equals(nhaCungCap.getEmail())
                    && nhaCungCapService.existsByEmail(nhaCungCap.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email đã tồn tại!");
            }

            // Kiểm tra trùng số điện thoại
            if (!existingNhaCungCap.getSoDienThoai().equals(nhaCungCap.getSoDienThoai())
                    && nhaCungCapService.existsBySoDienThoai(nhaCungCap.getSoDienThoai())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Số điện thoại đã tồn tại!");
            }

            // Cập nhật thông tin nhà cung cấp
            nhaCungCap.setMaNhaCungCap(id); // Giữ nguyên ID
            nhaCungCapService.saveNhaCungCap(nhaCungCap);
            return ResponseEntity.ok("Cập nhật thông tin nhà cung cấp thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi cập nhật nhà cung cấp.");
        }
    }

    // API xóa mềm nhà cung cấp
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNhaCungCapById(@PathVariable Integer id) {
        try {
            nhaCungCapService.deleteNhaCungCapById(id);
            return ResponseEntity.ok("Xóa nhà cung cấp thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi xóa nhà cung cấp với ID: " + id);
        }
    }

    // API lọc nhà cung cấp
    @GetMapping("/filter")
    public List<NhaCungCap> filterNhaCungCap(
            @RequestParam(required = false) String tenNhaCungCap,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String soDienThoai,
            @RequestParam(required = false) String diaChi) {
        return nhaCungCapService.filterNhaCungCap(tenNhaCungCap, email, soDienThoai, diaChi);
    }
}
