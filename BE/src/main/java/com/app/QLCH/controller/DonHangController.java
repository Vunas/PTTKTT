package com.app.QLCH.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import com.app.QLCH.model.DonHang;
import com.app.QLCH.service.DonHangService;

@RestController
@RequestMapping("/api/donhang")
public class DonHangController {

    @Autowired
    private DonHangService donHangService;

    // API lấy danh sách tất cả đơn hàng
    @GetMapping
    public List<DonHang> getAllDonHang() {
        return donHangService.getAllDonHang();
    }

    // API lấy đơn hàng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getDonHangById(@PathVariable Integer id) {
        DonHang donHang = donHangService.getDonHangById(id);
        if (donHang != null) {
            return ResponseEntity.ok(donHang);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy đơn hàng với ID: " + id);
    }

    // API thêm mới đơn hàng
    @PostMapping
    public ResponseEntity<?> saveDonHang(@RequestBody DonHang donHang) {
        try {
            return ResponseEntity.ok(donHangService.saveDonHang(donHang));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi lưu đơn hàng.");
        }
    }

    // API cập nhật thông tin đơn hàng
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDonHang(@PathVariable Integer id, @RequestBody DonHang donHang) {
        DonHang existingDonHang = donHangService.getDonHangById(id);
        if (existingDonHang == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy đơn hàng với ID: " + id);
        }
        donHang.setMaDonHang(id); // Giữ nguyên ID
        donHangService.saveDonHang(donHang);
        return ResponseEntity.ok("Cập nhật thông tin đơn hàng thành công!");
    }

    // API xóa đơn hàng
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDonHangById(@PathVariable Integer id) {
        try {
            donHangService.deleteDonHangById(id);
            return ResponseEntity.ok("Xóa đơn hàng thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi xóa đơn hàng với ID: " + id);
        }
    }

    // API lấy danh sách đơn hàng theo trạng thái
    @GetMapping("/trangthai/{trangThai}")
    public List<DonHang> getDonHangByTrangThai(@PathVariable Integer trangThai) {
        return donHangService.getDonHangByTrangThai(trangThai);
    }

    // // API lấy danh sách đơn hàng của một khách hàng
    // @GetMapping("/khachhang/{maKhachHang}")
    // public List<DonHang> getDonHangByKhachHangId(@PathVariable Integer maKhachHang) {
    //     return donHangService.getDonHangByKhachHangId(maKhachHang);
    // }

    // API lọc đơn hàng theo trạng thái và khoảng giá
    @GetMapping("/filter")
    public List<DonHang> filterDonHangByTrangThaiAndTongGia(
            @RequestParam(required = false) Integer maKhachHang,
            @RequestParam(required = false) Date ngayDatBatDau,
            @RequestParam(required = false) Date ngayDatKetThuc,
            @RequestParam(required = false) Integer trangThai,
            @RequestParam(required = false) Double minGia,
            @RequestParam(required = false) Double maxGia) {
        return donHangService.filterDonHang(maKhachHang, ngayDatBatDau, ngayDatKetThuc, minGia, maxGia, trangThai);
    }
}
