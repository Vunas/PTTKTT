package com.app.QLCH.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.app.QLCH.model.SanPham;
import com.app.QLCH.service.SanPhamService;

@RestController
@RequestMapping("/api/sanpham")
public class SanPhamController {

    @Autowired
    private SanPhamService sanPhamService;

    // API lấy danh sách tất cả sản phẩm
    @GetMapping
    public List<SanPham> getAllSanPham() {
        return sanPhamService.getAllSanPham();
    }

    // API lấy thông tin sản phẩm theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getSanPhamById(@PathVariable Integer id) {
        try {
            SanPham sanPham = sanPhamService.getSanPhamById(id);
            if (sanPham != null) {
                return ResponseEntity.ok(sanPham);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy sản phẩm với ID: " + id);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra.");
        }
    }

    // API thêm sản phẩm mới
    @PostMapping
    public ResponseEntity<?> saveSanPham(@RequestBody SanPham sanPham) {
        try {
            // Kiểm tra trùng tên sản phẩm
            if (sanPhamService.existsByTenSanPham(sanPham.getTenSanPham())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Sản phẩm với tên này đã tồn tại!");
            }

            // Lưu sản phẩm nếu không có lỗi    
            return ResponseEntity.ok(sanPhamService.saveSanPham(sanPham));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi thêm sản phẩm.");
        }
    }

    // API cập nhật thông tin sản phẩm
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSanPham(@PathVariable Integer id, @RequestBody SanPham sanPham) {
        try {
            // Kiểm tra xem sản phẩm có tồn tại hay không
            SanPham existingSanPham = sanPhamService.getSanPhamById(id);
            if (existingSanPham == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy sản phẩm với ID: " + id);
            }

            // Kiểm tra trùng tên nếu khác tên ban đầu
            if (!existingSanPham.getTenSanPham().equals(sanPham.getTenSanPham())
                    && sanPhamService.existsByTenSanPham(sanPham.getTenSanPham())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Sản phẩm với tên này đã tồn tại!");
            }

            // Cập nhật thông tin sản phẩm
            sanPham.setMaSanPham(id); // Giữ nguyên ID
            sanPhamService.saveSanPham(sanPham);
            return ResponseEntity.ok("Cập nhật sản phẩm thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi cập nhật sản phẩm.");
        }
    }

    // API xóa sản phẩm (đánh dấu trạng thái không hoạt động)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSanPhamById(@PathVariable Integer id) {
        try {
            sanPhamService.deleteSanPhamById(id);
            return ResponseEntity.ok("Xóa sản phẩm thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi xóa sản phẩm.");
        }
    }

    // API lọc sản phẩm với nhiều tiêu chí
    @GetMapping("/filter")
    public List<SanPham> filterSanPham(
            @RequestParam(required = false) String tenSanPham,
            @RequestParam(required = false) Double giaBanMin,
            @RequestParam(required = false) Double giaBanMax,
            @RequestParam(required = false) Integer soLuongMin,
            @RequestParam(required = false) Integer soLuongMax) {
        return sanPhamService.filterSanPham(tenSanPham, giaBanMin, giaBanMax, soLuongMin, soLuongMax);
    }
}
