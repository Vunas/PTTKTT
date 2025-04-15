package com.app.QLCH.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.QLCH.model.ChiTietPhieuXuat;
import com.app.QLCH.model.NguyenLieu;
import com.app.QLCH.model.PhieuXuat;
import com.app.QLCH.repository.ChiTietPhieuXuatRepository;
import com.app.QLCH.service.ChiTietPhieuXuatService;
import com.app.QLCH.service.NguyenLieuService;
import com.app.QLCH.service.PhieuXuatService;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/chi-tiet-phieu-xuat")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@RequiredArgsConstructor
public class ChiTietPhieuXuatController {

   private final ChiTietPhieuXuatService chiTietPhieuXuatService;
   private final PhieuXuatService phieuXuatService;
   private final NguyenLieuService nguyenLieuService;
   private final ChiTietPhieuXuatRepository repository;


   // Lấy tất cả chi tiết phiếu nhập
   @GetMapping("/list-get")
   public ResponseEntity<List<ChiTietPhieuXuat>> getAll() {
      return ResponseEntity.ok(chiTietPhieuXuatService.getAllChiTiet());
   }
   
   @PutMapping("/list-update")
   public ResponseEntity<?> updateList(@RequestBody List<ChiTietPhieuXuat> chiTietList) {
   try {
      List<ChiTietPhieuXuat> updatedList = new ArrayList<>();
      for (ChiTietPhieuXuat chiTiet : chiTietList) {
         // Fetch the PhieuXuat and NguyenLieu objects based on their IDs
         PhieuXuat phieuXuat = phieuXuatService.getPhieuXuatById(chiTiet.getPhieuXuat().getId());
         NguyenLieu nguyenLieu = nguyenLieuService.getNguyenLieuById(chiTiet.getNguyenLieu().getMaNguyenLieu());
         //System.out.println("PhieuXuat: " + phieuXuat);
         // Set the fetched objects to the ChiTietPhieuXuat instance
         chiTiet.setPhieuXuat(phieuXuat);
         chiTiet.setNguyenLieu(nguyenLieu);

         // Update the ChiTietPhieuXuat in the database
         ChiTietPhieuXuat updated = repository.save(chiTiet);
         updatedList.add(updated);
      }
      return ResponseEntity.ok(updatedList);
   } catch (Exception e) {
      return ResponseEntity.badRequest().body("Lỗi khi cập nhật chi tiết phiếu nhập: " + e.getMessage());
   }
}

   // Lấy chi tiết phiếu nhập theo ID
   @GetMapping("/thanh-phan/id/{id}")
   public ResponseEntity<?> getById(@PathVariable Integer id) {
      ChiTietPhieuXuat ct = chiTietPhieuXuatService.getById(id);
      return ct != null ? ResponseEntity.ok(ct)
                        : ResponseEntity.badRequest().body("Không tìm thấy chi tiết phiếu nhập với ID: " + id);
   }

   // Thêm chi tiết phiếu nhập mới (có thể dùng để thêm độc lập)
   @PostMapping
   public ResponseEntity<?> create(@RequestBody ChiTietPhieuXuat chiTietPhieuXuat) {
      try {
         return ResponseEntity.ok(chiTietPhieuXuatService.save(chiTietPhieuXuat));
      } catch (Exception e) {
         return ResponseEntity.badRequest().body("Lỗi khi thêm chi tiết phiếu nhập: " + e.getMessage());
      }
   }

   // Cập nhật chi tiết phiếu nhập
   @PutMapping("/{id}")
   public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody ChiTietPhieuXuat updated) {
      try {
         ChiTietPhieuXuat result = chiTietPhieuXuatService.update(id, updated);
         return ResponseEntity.ok(result);
      } catch (Exception e) {
         return ResponseEntity.badRequest().body("Lỗi khi cập nhật: " + e.getMessage());
      }
   }

   // Xóa chi tiết phiếu nhập
   @DeleteMapping("/{id}")
   public ResponseEntity<?> delete(@PathVariable Integer id) {
      try {
         chiTietPhieuXuatService.deleteById(id);
         return ResponseEntity.ok("Xóa thành công!");
      } catch (Exception e) {
         return ResponseEntity.badRequest().body("Lỗi khi xóa: " + e.getMessage());
      }
   }
}
