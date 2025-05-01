package com.app.QLCH.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import com.app.QLCH.model.DonHang;
import com.app.QLCH.service.DonHangService;
import org.springframework.format.annotation.DateTimeFormat;

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

    @GetMapping("/ignoreTrangThai/{id}")
    public ResponseEntity<?> getDonHangIgnoreTrangThaiById(@PathVariable Integer id) {
        DonHang donHang = donHangService.getDonHangByIdIgnoreTrangThai(id);
        if (donHang != null) {
            return ResponseEntity.ok(donHang);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy đơn hàng với ID: " + id);
    }

    // API thêm mới đơn hàng
    @PostMapping
    public ResponseEntity<?> saveDonHang(@RequestBody DonHang donHang) {
        System.out.println("loi o dayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
        System.out.println(donHang);
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


    @GetMapping("/filter")
    public List<DonHang> filterDonHang(
            @RequestParam(required = false) Integer maKhachHang,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate ngayDatBatDau,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate ngayDatKetThuc,
            @RequestParam(required = false) String diaChiGiaoHang,
            @RequestParam(required = false) String phuongThucThanhToan,
            @RequestParam(required = false) Double minGia,
            @RequestParam(required = false) Double maxGia,
            @RequestParam(required = false) String trangThaiGiaoHang) {
    
        // Gán giá trị mặc định nếu tham số ngày không được cung cấp
        if (ngayDatBatDau == null) {
            ngayDatBatDau = LocalDate.of(1970, 1, 1); // Ngày bắt đầu mặc định (epoch)
        }
        if (ngayDatKetThuc == null) {
            ngayDatKetThuc = LocalDate.now().plusDays(1); // Bao gồm cả ngày hiện tại
        }
    
        // Chuyển đổi LocalDate sang java.sql.Date nếu Service yêu cầu kiểu Date
        Date startDate = java.sql.Date.valueOf(ngayDatBatDau);
        Date endDate = java.sql.Date.valueOf(ngayDatKetThuc);
    
        return donHangService.filterDonHang(maKhachHang, startDate, endDate, 
                                            diaChiGiaoHang, phuongThucThanhToan, 
                                            minGia, maxGia, trangThaiGiaoHang);
    }
    
}
