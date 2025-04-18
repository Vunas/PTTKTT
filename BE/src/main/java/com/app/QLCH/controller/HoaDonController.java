package com.app.QLCH.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

import com.app.QLCH.model.HoaDon;
import com.app.QLCH.service.HoaDonService;
import org.springframework.format.annotation.DateTimeFormat;

@RestController
@RequestMapping("/api/hoadon")
public class HoaDonController {

    @Autowired
    private HoaDonService hoaDonService;

    // API lấy danh sách tất cả hóa đơn
    @GetMapping
    public List<HoaDon> getAllHoaDon() {
        return hoaDonService.getAllHoaDon();
    }

    // API lấy hóa đơn theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getHoaDonById(@PathVariable Integer id) {
        HoaDon hoaDon = hoaDonService.getHoaDonById(id);
        if (hoaDon != null) {
            return ResponseEntity.ok(hoaDon);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy hóa đơn với ID: " + id);
    }

    // API thêm mới hóa đơn
    @PostMapping
    public ResponseEntity<?> saveHoaDon(@RequestBody HoaDon hoaDon) {
        try {
            return ResponseEntity.ok(hoaDonService.saveHoaDon(hoaDon));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi lưu hóa đơn.");
        }
    }

    @GetMapping("/khach-hang/{maKhachHang}")
    public ResponseEntity<List<HoaDon>> getHoaDonByMaKhachHang(@PathVariable Integer maKhachHang) {
        List<HoaDon> hoaDons = hoaDonService.getHoaDonByMaKhachHang(maKhachHang);
        return ResponseEntity.ok(hoaDons);
    }

    // API cập nhật thông tin hóa đơn
    @PutMapping("/{id}")
    public ResponseEntity<?> updateHoaDon(@PathVariable Integer id, @RequestBody HoaDon hoaDon) {
        HoaDon existingHoaDon = hoaDonService.getHoaDonById(id);
        if (existingHoaDon == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy hóa đơn với ID: " + id);
        }
        hoaDon.setMaHoaDon(id); // Giữ nguyên ID
        hoaDonService.saveHoaDon(hoaDon);
        return ResponseEntity.ok("Cập nhật thông tin hóa đơn thành công!");
    }

    // API xóa hóa đơn
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHoaDonById(@PathVariable Integer id) {
        try {
            hoaDonService.deleteHoaDonById(id);
            return ResponseEntity.ok("Xóa hóa đơn thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi xóa hóa đơn với ID: " + id);
        }
    }

    // API lọc hóa đơn dựa trên nhiều điều kiện
    @GetMapping("/filter")
    public List<HoaDon> filterHoaDon(
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate ngayBatDau,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate ngayKetThuc,
            @RequestParam(required = false) Double minTongTien,
            @RequestParam(required = false) Double maxTongTien,
            @RequestParam(required = false) Integer maKhuyenMai,
            @RequestParam(required = false) Integer maNhanVien) {

        return hoaDonService.filterHoaDon(ngayBatDau, ngayKetThuc, minTongTien, maxTongTien, maKhuyenMai, maNhanVien);
    }
}