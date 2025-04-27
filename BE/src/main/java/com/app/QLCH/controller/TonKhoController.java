package com.app.QLCH.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.app.QLCH.model.TonKho;
import com.app.QLCH.DTO.TonKhoDTO;
import com.app.QLCH.model.KhoHang;
import com.app.QLCH.model.NguyenLieu; // Đã sửa từ SanPham thành NguyenLieu
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

    @PostMapping("check-update-ton-kho")
    public ResponseEntity<?> checkTonKho(@RequestBody TonKhoDTO tonKhoDTO) {
        try {
            boolean result = tonKhoService.updateNguyenLieuTonKho(tonKhoDTO);
            if (result) {
                return ResponseEntity.ok("Tồn kho hợp lệ.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Số lượng trong kho không đủ");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi kiểm tra tồn kho.");
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

    // API lấy danh sách tồn kho theo sản phẩm (đã sửa tên)
    @GetMapping("/nguyenlieu/{maNguyenLieu}")
    public ResponseEntity<?> getTonKhoByNguyenLieu(@PathVariable Integer maNguyenLieu) {
        NguyenLieu nguyenLieu = new NguyenLieu();
        nguyenLieu.setMaNguyenLieu(maNguyenLieu);
        List<TonKho> tonKhoList = tonKhoService.getTonKhoByNguyenLieu(nguyenLieu);
        return ResponseEntity.ok(tonKhoList);
    }

    // API lấy tồn kho theo kho hàng và sản phẩm (đã sửa tên)
    @GetMapping("/search")
    public ResponseEntity<?> getTonKhoByKhoHangAndNguyenLieu(
            @RequestParam Integer maKhoHang,
            @RequestParam Integer maNguyenLieu) {
        KhoHang khoHang = new KhoHang();
        khoHang.setMaKhoHang(maKhoHang);
        NguyenLieu nguyenLieu = new NguyenLieu();
        nguyenLieu.setMaNguyenLieu(maNguyenLieu);
        TonKho tonKho = tonKhoService.getTonKhoByKhoHangAndNguyenLieu(khoHang, nguyenLieu);
        if (tonKho != null) {
            return ResponseEntity.ok(tonKho);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Không tìm thấy tồn kho cho nguyên liệu tại kho hàng.");
    }

    @GetMapping("/filter")
    public ResponseEntity<?> filterTonKho(
            @RequestParam(required = false) Integer maKhoHang,
            @RequestParam(required = false) Integer maNguyenLieu,
            @RequestParam(required = false) Integer soLuongMin,
            @RequestParam(required = false) Integer soLuongMax) {
        try {
            List<TonKho> filteredTonKho = tonKhoService.filterTonKho(maKhoHang, maNguyenLieu, soLuongMin, soLuongMax);
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