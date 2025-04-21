package com.app.QLCH.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.QLCH.DTO.CheBienDTO;
import com.app.QLCH.model.CheBien;
import com.app.QLCH.model.ChiTietCheBien;
import com.app.QLCH.model.NguyenLieu;
import com.app.QLCH.model.SanPham;
import com.app.QLCH.service.CheBienService;
import com.app.QLCH.service.ChiTietCheBienService;
import com.app.QLCH.service.ChiTietNguyenLieuSanPhamService;
import com.app.QLCH.service.NguyenLieuService;
import com.app.QLCH.service.SanPhamService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/chebien")
public class CheBienController {

    @Autowired
    private CheBienService cheBienService;

    @Autowired
    private SanPhamService sanPhamService;

    @Autowired
    private NguyenLieuService nguyenLieuService;

    @Autowired
    private ChiTietNguyenLieuSanPhamService chiTietNguyenLieuSanPhamService;

    @Autowired
    private ChiTietCheBienService chiTietCheBienService;

    // API lấy danh sách tất cả CheBien
    @GetMapping
    public ResponseEntity<List<CheBien>> getAllCheBiens() {
        List<CheBien> cheBiens = cheBienService.getAllActiveCheBien();
        return ResponseEntity.ok(cheBiens);
    }

    // API lấy thông tin CheBien theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getCheBienById(@PathVariable Integer id) {
        CheBien cheBien = cheBienService.getCheBienById(id);
        List<ChiTietCheBien> chiTietCheBienList = chiTietCheBienService.findByCheBien(id);
        if (cheBien == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy CheBien với ID: " + id);
        }
        return ResponseEntity.ok(new CheBienDTO(cheBien, chiTietCheBienList));
    }

    // API thêm hoặc cập nhật CheBien kèm danh sách ChiTietCheBien
    @PostMapping
    public ResponseEntity<?> saveCheBien(@RequestBody CheBienDTO cheBienDTO) {
        List<SanPham> sanPhamList = new ArrayList<>();

        // Thu thập danh sách sản phẩm từ chi tiết chế biến
        for (ChiTietCheBien chiTietCheBien : cheBienDTO.getChiTietCheBienList()) {
            SanPham sanPham = sanPhamService.getSanPhamById(chiTietCheBien.getSanPham().getMaSanPham());  
            if (sanPham == null) {
                return ResponseEntity.badRequest()
                        .body("Không tìm thấy sản phẩm có mã: " + chiTietCheBien.getSanPham().getMaSanPham());
            }
            sanPham.setSoLuong(chiTietCheBien.getSoLuongSanPham());
            sanPhamList.add(sanPham);
        }

        // Lấy danh sách nguyên liệu cần dùng (đã chứa số lượng cần)
        System.out.println("batdauuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
        List<NguyenLieu> nguyenLieuListDefault = nguyenLieuService.getAllNguyenLieu();
        System.out.println(nguyenLieuListDefault);
        List<NguyenLieu> nguyenLieuList = chiTietNguyenLieuSanPhamService.findNguyenLieuBySanPham(sanPhamList);
        System.out.println(nguyenLieuList);
        System.out.println("casssssssssssss");
        

        // Kiểm tra số lượng nguyên liệu có đủ không
        for (NguyenLieu nLieu : nguyenLieuListDefault) {
            for (NguyenLieu nguyenLieu : nguyenLieuList) {
                if (nLieu.getMaNguyenLieu() == nguyenLieu.getMaNguyenLieu()) {
                    System.out.println(nLieu);
                    System.out.println(nguyenLieu);
                    if (nLieu.getSoLuong() < nguyenLieu.getSoLuong()) {
                        return ResponseEntity.badRequest().body("Nguyên liệu không đủ: " + nguyenLieu.getTen());
                    }
                    break;
                }
            }
        }

        System.out.println("daaaaaaaaaaaaaaaaa");

        for (NguyenLieu nLieu : nguyenLieuListDefault) {
            for (NguyenLieu nguyenLieu : nguyenLieuList) {
                if (nLieu.getMaNguyenLieu() == nguyenLieu.getMaNguyenLieu()) {
                    nLieu.setSoLuong(nLieu.getSoLuong() - nguyenLieu.getSoLuong());
                    nguyenLieuService.saveNguyenLieu(nLieu);
                    break;
                }
            }
        }

        CheBien savedCheBien = cheBienService.saveCheBien(cheBienDTO.getCheBien());

        // Cập nhật số lượng sản phẩm mới
        for (ChiTietCheBien chiTiet : cheBienDTO.getChiTietCheBienList()) {
            chiTiet.setCheBien(savedCheBien);
            SanPham sanPham = sanPhamService.getSanPhamById(chiTiet.getSanPham().getMaSanPham());

            if (sanPham == null) {
                return ResponseEntity.badRequest()
                        .body("Sản phẩm không tồn tại: " + chiTiet.getSanPham().getMaSanPham());
            }

            // Cập nhật số lượng sản phẩm sau khi chế biến
            sanPham.setSoLuong(sanPham.getSoLuong() + chiTiet.getSoLuongSanPham());
            sanPhamService.saveSanPham(sanPham);

            chiTietCheBienService.saveChiTietCheBien(chiTiet);
        }

        return ResponseEntity.ok(savedCheBien);
    }

    // API cập nhật CheBien và danh sách ChiTietCheBien
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCheBien(@PathVariable Integer id, @RequestBody CheBienDTO cheBienDTO) {
        CheBien existingCheBien = cheBienService.getCheBienById(id);
        if (existingCheBien == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy CheBien với ID: " + id);
        }

        CheBien updatedCheBien = cheBienDTO.getCheBien();
        updatedCheBien.setMaCheBien(id);
        updatedCheBien = cheBienService.saveCheBien(updatedCheBien);

        // Xóa mềm các ChiTietCheBien cũ và thêm mới lại
        chiTietCheBienService.softDeleteChiTietByCheBien(id);

        if (cheBienDTO.getChiTietCheBienList() != null && !cheBienDTO.getChiTietCheBienList().isEmpty()) {
            for (ChiTietCheBien chiTiet : cheBienDTO.getChiTietCheBienList()) {
                chiTiet.setCheBien(updatedCheBien);
            }
            chiTietCheBienService.saveAll(cheBienDTO.getChiTietCheBienList());
        }

        return ResponseEntity.ok(updatedCheBien);
    }

    // API xóa mềm CheBien và toàn bộ ChiTietCheBien liên quan
    @DeleteMapping("/{id}")
    public ResponseEntity<?> softDeleteCheBien(@PathVariable Integer id) {
        try {
            // Xóa mềm toàn bộ ChiTietCheBien liên quan trước khi xóa mềm CheBien
            chiTietCheBienService.softDeleteChiTietByCheBien(id);
            cheBienService.softDeleteCheBien(id);

            return ResponseEntity.ok("Xóa mềm CheBien và các ChiTietCheBien liên quan thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi khi xóa mềm CheBien.");
        }
    }

    @PostMapping("/nguyenlieu")
    public List<NguyenLieu> findNguyenLieuBySanPhamList(@RequestBody List<SanPham> sanPhamList) {
        return chiTietNguyenLieuSanPhamService.findNguyenLieuBySanPham(sanPhamList);
    }
}
