package com.app.QLCH.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.app.QLCH.DTO.SanPhamWithDetails;
import com.app.QLCH.model.ChiTietNguyenLieuSanPham;
import com.app.QLCH.model.SanPham;
import com.app.QLCH.service.ChiTietNguyenLieuSanPhamService;
import com.app.QLCH.service.SanPhamService;

@RestController
@RequestMapping("/api/sanpham")
public class SanPhamController {

    @Autowired
    private SanPhamService sanPhamService;

    @Autowired
    private ChiTietNguyenLieuSanPhamService chiTietService;

    // Lấy danh sách sản phẩm kèm nguyên liệu
    @GetMapping
    public List<SanPham> getAllSanPham() {
        return sanPhamService.getAllSanPham();
    }

    // Lấy sản phẩm theo ID kèm nguyên liệu
    @GetMapping("/{id}")
    public ResponseEntity<?> getSanPhamById(@PathVariable Integer id) {
        try {
            SanPham sanPham = sanPhamService.getSanPhamById(id);
            List<ChiTietNguyenLieuSanPham> chiTietNguyenLieu = chiTietService.findBySanPham(id);

            if (sanPham != null) {
                return ResponseEntity.ok(new SanPhamWithDetails(sanPham, chiTietNguyenLieu));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Không tìm thấy sản phẩm với ID: " + id);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra.");
        }
    }

    // Thêm sản phẩm mới kèm chi tiết nguyên liệu
    @PostMapping
    public ResponseEntity<?> saveSanPhamWithDetails(@RequestBody SanPhamWithDetails payload) {
        try {
            // Kiểm tra nếu danh sách nguyên liệu rỗng
            if (payload.getChiTietNguyenLieu() == null || payload.getChiTietNguyenLieu().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Danh sách nguyên liệu không được trống.");
            }

            // Lưu sản phẩm
            SanPham savedSanPham = sanPhamService.saveSanPham(payload.getSanPham());

            // Lưu danh sách nguyên liệu liên quan
            for (ChiTietNguyenLieuSanPham chiTiet : payload.getChiTietNguyenLieu()) {
                chiTiet.setSanPham(savedSanPham);
                chiTietService.saveChiTiet(chiTiet);
            }

            return ResponseEntity.ok(savedSanPham);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi khi thêm sản phẩm: " + e.getMessage());
        }
    }

    // Cập nhật sản phẩm và chi tiết nguyên liệu
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSanPhamWithDetails(@PathVariable Integer id,
                                                      @RequestBody SanPhamWithDetails payload) {
        try {
            SanPham existingSanPham = sanPhamService.getSanPhamById(id);
            if (existingSanPham == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Không tìm thấy sản phẩm với ID: " + id);
            }

            // Cập nhật thông tin sản phẩm
            SanPham newSanPham = payload.getSanPham();
            newSanPham.setMaSanPham(id);
            sanPhamService.saveSanPham(newSanPham);

            // Xóa chi tiết nguyên liệu cũ và cập nhật mới
            chiTietService.deleteBySanPhamId(id);
            for (ChiTietNguyenLieuSanPham chiTiet : payload.getChiTietNguyenLieu()) {
                chiTiet.setSanPham(newSanPham);
                chiTietService.saveChiTiet(chiTiet);
            }

            return ResponseEntity.ok(newSanPham);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi khi cập nhật sản phẩm: " + e.getMessage());
        }
    }

    // Cập nhật số lượng sản phẩm
    @PutMapping("/bulk")
    public ResponseEntity<?> validateAndUpdateSanPhamBulk(@RequestBody List<SanPham> sanPhamList) {
        List<SanPham> sanPhamListDeFault = sanPhamService.getAllSanPham();
        System.out.println("Hàm validate và cập nhật số lượng sản phẩm được gọi");
        System.out.println(sanPhamList);
        System.out.println("aaaaaaaaaaaaaaaaaaa");
        System.out.println(sanPhamListDeFault);
        try {

            for (SanPham sanPham : sanPhamList) {
                for (SanPham sp : sanPhamListDeFault) {
                    System.out.println("texxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
                    if (sp.getMaSanPham() == sanPham.getMaSanPham()) {
                        if ((sp.getSoLuong() - sanPham.getSoLuong()) < 0) {
                            System.out.println(sp.getSoLuong());
                            System.out.println(sanPham.getSoLuong());
                            System.out.println("accccccccccccccccccccccssssssssss");
                            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                    .body("Số lượng cập nhật không hợp lệ cho sản phẩm ID: " + sanPham.getMaSanPham()
                                            + ". Số lượng còn lại không đủ!");
                        }
                        break;
                    }
                }
            }

            System.out.println("123");

            for (SanPham sanPham : sanPhamList) {
                for (SanPham sp : sanPhamListDeFault) {
                    if (sanPham.getMaSanPham() == sp.getMaSanPham()) {
                        sp.setSoLuong(sp.getSoLuong() - sanPham.getSoLuong());
                        break;
                    }
                }
            }

            return ResponseEntity.ok(sanPhamService.saveSanPhamBulk(sanPhamListDeFault));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi kiểm tra hoặc cập nhật số lượng sản phẩm.");
        }
    }


    // Xóa sản phẩm và nguyên liệu liên quan
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSanPhamById(@PathVariable Integer id) {
        try {
            // Xóa toàn bộ nguyên liệu liên quan trước khi xóa sản phẩm
            chiTietService.deleteBySanPhamId(id);
            sanPhamService.deleteSanPhamById(id);
            return ResponseEntity.ok("Xóa sản phẩm và nguyên liệu thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi khi xóa sản phẩm.");
        }
    }

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