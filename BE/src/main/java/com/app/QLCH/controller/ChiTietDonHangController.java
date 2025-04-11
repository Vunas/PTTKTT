package com.app.QLCH.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.QLCH.model.ChiTietDonHang;
import com.app.QLCH.service.ChiTietDonHangService;

import java.util.List;

@RestController
@RequestMapping("/api/chitietdonhang")
public class ChiTietDonHangController {

    @Autowired
    private ChiTietDonHangService chiTietDonHangService;

    // API lấy danh sách tất cả chi tiết đơn hàng
    @GetMapping
    public List<ChiTietDonHang> getAllChiTietDonHang() {
        return chiTietDonHangService.getAllChiTietDonHang();
    }

    // API lấy chi tiết đơn hàng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getChiTietDonHangById(@PathVariable Integer id) {
        ChiTietDonHang chiTiet = chiTietDonHangService.getChiTietDonHangById(id);
        if (chiTiet != null) {
            return ResponseEntity.ok(chiTiet);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Không tìm thấy chi tiết đơn hàng với ID: " + id);
    }

    // API lấy chi tiết đơn hàng theo mã đơn hàng
    @GetMapping("/donhang/{maDonHang}")
    public List<ChiTietDonHang> getChiTietByMaDonHang(@PathVariable Integer maDonHang) {
        return chiTietDonHangService.getChiTietByMaDonHangAndTrangThai(maDonHang);
    }

    // API lấy chi tiết đơn hàng theo mã sản phẩm
    @GetMapping("/sanpham/{maSanPham}")
    public List<ChiTietDonHang> getChiTietByMaSanPham(@PathVariable Integer maSanPham) {
        return chiTietDonHangService.getChiTietByMaSanPham(maSanPham);
    }

    // API thêm mới chi tiết đơn hàng
    @PostMapping
    public ResponseEntity<?> saveChiTietDonHang(@RequestBody ChiTietDonHang chiTietDonHang) {
        try {
            return ResponseEntity.ok(chiTietDonHangService.saveChiTietDonHang(chiTietDonHang));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi lưu chi tiết đơn hàng.");
        }
    }

    // API thêm mới danh sách chi tiết đơn hàng
    @PostMapping("/bulk")
    public ResponseEntity<?> saveChiTietDonHangBulk(@RequestBody List<ChiTietDonHang> chiTietDonHangList) {
        for (ChiTietDonHang chiTietDonHang : chiTietDonHangList) {
            chiTietDonHang.setThanhTien(null);
        }
        try {
            List<ChiTietDonHang> savedChiTietDonHangList = chiTietDonHangService
                    .saveChiTietDonHangBulk(chiTietDonHangList);
            return ResponseEntity.ok(savedChiTietDonHangList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi lưu danh sách chi tiết đơn hàng.");
        }
    }

    // API cập nhật chi tiết đơn hàng
    @PutMapping("/{id}")
    public ResponseEntity<?> updateChiTietDonHang(@PathVariable Integer id,
            @RequestBody ChiTietDonHang chiTietDonHang) {
        ChiTietDonHang existingChiTiet = chiTietDonHangService.getChiTietDonHangById(id);
        if (existingChiTiet == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Không tìm thấy chi tiết đơn hàng với ID: " + id);
        }
        chiTietDonHang.setMaChiTiet(id); // Giữ nguyên ID
        chiTietDonHangService.saveChiTietDonHang(chiTietDonHang);
        return ResponseEntity.ok("Cập nhật chi tiết đơn hàng thành công!");
    }

    @PutMapping("/bulk")
    public ResponseEntity<?> updateChiTietDonHangBulk(@RequestBody List<ChiTietDonHang> chiTietDonHangList) {
        System.out.println("ham nay da dc goi abccccccccccccccccccccccccccccccccc");
        for (ChiTietDonHang chiTietDonHang : chiTietDonHangList) {
            chiTietDonHang.setThanhTien(null);
        }
        try {
            List<ChiTietDonHang> updatedChiTietDonHangList = chiTietDonHangService
                    .updateChiTietDonHangBulk(chiTietDonHangList);
            return ResponseEntity.ok(updatedChiTietDonHangList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi cập nhật danh sách chi tiết đơn hàng.");
        }
    }

    // API xóa chi tiết đơn hàng
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteChiTietDonHangById(@PathVariable Integer id) {
        try {
            chiTietDonHangService.deleteChiTietDonHangById(id);
            return ResponseEntity.ok("Xóa chi tiết đơn hàng thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi xóa chi tiết đơn hàng với ID: " + id);
        }
    }

    // API lọc chi tiết đơn hàng theo đơn giá
    @GetMapping("/filter")
    public List<ChiTietDonHang> filterChiTietDonHang(
            @RequestParam(required = false) Double minDonGia,
            @RequestParam(required = false) Double maxDonGia) {
        return chiTietDonHangService.filterChiTietByDonGia(minDonGia, maxDonGia);
    }
}