package com.app.QLCH.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.app.QLCH.model.TonKho;
import com.app.QLCH.model.KhoHang;
import com.app.QLCH.model.SanPham;
import com.app.QLCH.service.TonKhoService;

@RestController
@RequestMapping("/api/tonkho")
public class TonKhoController {

    @Autowired
    private TonKhoService tonKhoService;

    // API lấy danh sách tồn kho
    @GetMapping
    public List<TonKho> getAllTonKho() {
        return tonKhoService.getAllTonKho();
    }

    // API lấy thông tin tồn kho theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getTonKhoById(@PathVariable Integer id) {
        TonKho tonKho = tonKhoService.getTonKhoById(id);
        if (tonKho != null) {
            return ResponseEntity.ok(tonKho);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy tồn kho với ID: " + id);
    }

    // API thêm mới hoặc cập nhật tồn kho
    @PostMapping
    public ResponseEntity<?> saveTonKho(@RequestBody TonKho tonKho) {
        try {
            return ResponseEntity.ok(tonKhoService.saveTonKho(tonKho));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi lưu tồn kho.");
        }
    }

    // API lấy danh sách tồn kho theo kho hàng
    @GetMapping("/khohang/{maKhoHang}")
    public ResponseEntity<?> getTonKhoByKhoHang(@PathVariable Integer maKhoHang) {
        KhoHang khoHang = new KhoHang();
        khoHang.setMaKhoHang(maKhoHang);
        List<TonKho> tonKhoList = tonKhoService.getTonKhoByKhoHang(khoHang);
        return ResponseEntity.ok(tonKhoList);
    }

    // API lấy danh sách tồn kho theo sản phẩm
    @GetMapping("/sanpham/{maSanPham}")
    public ResponseEntity<?> getTonKhoBySanPham(@PathVariable Integer maSanPham) {
        SanPham sanPham = new SanPham();
        sanPham.setMaSanPham(maSanPham);
        List<TonKho> tonKhoList = tonKhoService.getTonKhoBySanPham(sanPham);
        return ResponseEntity.ok(tonKhoList);
    }

    // API lấy tồn kho theo kho hàng và sản phẩm
    @GetMapping("/search")
    public ResponseEntity<?> getTonKhoByKhoHangAndSanPham(
            @RequestParam Integer maKhoHang,
            @RequestParam Integer maSanPham) {
        KhoHang khoHang = new KhoHang();
        khoHang.setMaKhoHang(maKhoHang);
        SanPham sanPham = new SanPham();
        sanPham.setMaSanPham(maSanPham);
        TonKho tonKho = tonKhoService.getTonKhoByKhoHangAndSanPham(khoHang, sanPham);
        if (tonKho != null) {
            return ResponseEntity.ok(tonKho);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Không tìm thấy tồn kho cho sản phẩm tại kho hàng.");
    }

    @GetMapping("/filter")
    public ResponseEntity<?> filterTonKho(
            @RequestParam(required = false) Integer maKhoHang,
            @RequestParam(required = false) Integer maSanPham,
            @RequestParam(required = false) Integer soLuongMin,
            @RequestParam(required = false) Integer soLuongMax) {
        try {
            List<TonKho> filteredTonKho = tonKhoService.filterTonKho(maKhoHang, maSanPham, soLuongMin, soLuongMax);
            return ResponseEntity.ok(filteredTonKho);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi lọc dữ liệu tồn kho: " + e.getMessage());
        }
    }

    // API xóa tồn kho theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTonKhoById(@PathVariable Integer id) {
        try {
            tonKhoService.deleteTonKhoById(id);
            return ResponseEntity.ok("Xóa tồn kho thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi xóa tồn kho với ID: " + id);
        }
    }
}