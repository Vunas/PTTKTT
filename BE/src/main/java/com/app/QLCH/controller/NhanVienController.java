package com.app.QLCH.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.app.QLCH.model.NhanVien;
import com.app.QLCH.service.NhanVienService;

@RestController
@RequestMapping("/api/nhanvien")
public class NhanVienController {

    @Autowired
    private NhanVienService nhanVienService;

    // API lấy danh sách nhân viên đang hoạt động
    @GetMapping
    public List<NhanVien> getAllNhanVien() {
        return nhanVienService.getAllNhanVien();
    }

    // API lấy thông tin nhân viên theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getNhanVienById(@PathVariable Integer id) {
        try {
            NhanVien nhanVien = nhanVienService.getNhanVienById(id);
            return ResponseEntity.ok(nhanVien);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy nhân viên với ID: " + id);
        }
    }

    // API thêm thông tin nhân viên
    @PostMapping
    public ResponseEntity<?> saveNhanVien(@RequestBody NhanVien nhanVien) {
        try {
            // Kiểm tra trùng email
            if (nhanVienService.existsByEmail(nhanVien.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email đã tồn tại!");
            }

            // Kiểm tra trùng số điện thoại
            if (nhanVienService.existsBySoDienThoai(nhanVien.getSoDienThoai())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Số điện thoại đã tồn tại!");
            }

            // Lưu nhân viên nếu không có lỗi    
            return ResponseEntity.ok(nhanVienService.saveNhanVien(nhanVien));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi lưu nhân viên.");
        }
    }

    // API cập nhật thông tin nhân viên
    @PutMapping("/{id}")
    public ResponseEntity<?> updateNhanVien(@PathVariable Integer id, @RequestBody NhanVien nhanVien) {
        try {
            // Kiểm tra xem nhân viên có tồn tại không
            NhanVien existingNhanVien = nhanVienService.getNhanVienById(id);
            if (existingNhanVien == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy nhân viên với ID: " + id);
            }

            if (!existingNhanVien.getEmail().equals(nhanVien.getEmail()) && nhanVienService.existsByEmail(nhanVien.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email đã tồn tại!");
            }

            // Kiểm tra trùng số điện thoại
            if (!existingNhanVien.getSoDienThoai().equals(nhanVien.getSoDienThoai()) &&nhanVienService.existsBySoDienThoai(nhanVien.getSoDienThoai())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Số điện thoại đã tồn tại!");
            }

            // Cập nhật thông tin nhân viên
            nhanVien.setMaNhanVien(id); // Đảm bảo giữ nguyên ID
            nhanVienService.saveNhanVien(nhanVien);
            return ResponseEntity.ok("Cập nhật thông tin nhân viên thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi cập nhật nhân viên.");
        }
    }

    // API xóa mềm nhân viên
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNhanVienById(@PathVariable Integer id) {
        try {
            nhanVienService.deleteNhanVienById(id);
            return ResponseEntity.ok("Xóa nhân viên thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi xóa nhân viên với ID: " + id);
        }
    }

    @GetMapping("/filter")
    public List<NhanVien> filterNhanVien(
            @RequestParam(required = false) String hoTen,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String gioiTinh,
            @RequestParam(required = false) String soDienThoai,
            @RequestParam(required = false) String diaChi,
            @RequestParam(required = false) String chucVu) {
        return nhanVienService.filterNhanVien(hoTen, email, gioiTinh, soDienThoai, diaChi, chucVu, 1);
    }
}