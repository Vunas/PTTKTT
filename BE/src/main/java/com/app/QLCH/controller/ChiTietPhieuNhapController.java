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

import com.app.QLCH.model.ChiTietPhieuNhap;
import com.app.QLCH.model.NguyenLieu;
import com.app.QLCH.model.PhieuNhap;
import com.app.QLCH.repository.ChiTietPhieuNhapRepository;
import com.app.QLCH.service.ChiTietPhieuNhapService;
import com.app.QLCH.service.NguyenLieuService;
import com.app.QLCH.service.PhieuNhapService;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/chi-tiet-phieu-nhap")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@RequiredArgsConstructor
public class ChiTietPhieuNhapController {

   private final ChiTietPhieuNhapService chiTietPhieuNhapService;
   private final PhieuNhapService phieuNhapService;
   private final NguyenLieuService nguyenLieuService;
   private final ChiTietPhieuNhapRepository repository;


   // Lấy tất cả chi tiết phiếu nhập
   @GetMapping("/list-get")
   public ResponseEntity<List<ChiTietPhieuNhap>> getAll() {
      return ResponseEntity.ok(chiTietPhieuNhapService.getAllChiTiet());
   }
   
   @PutMapping("/list-update")
   public ResponseEntity<?> updateList(@RequestBody List<ChiTietPhieuNhap> chiTietList) {
   try {
      List<ChiTietPhieuNhap> updatedList = new ArrayList<>();
      for (ChiTietPhieuNhap chiTiet : chiTietList) {
         // Fetch the PhieuNhap and NguyenLieu objects based on their IDs
         PhieuNhap phieuNhap = phieuNhapService.getPhieuNhapById(chiTiet.getPhieuNhap().getId());
         NguyenLieu nguyenLieu = nguyenLieuService.getNguyenLieuById(chiTiet.getNguyenLieu().getMaNguyenLieu());
         //System.out.println("PhieuNhap: " + phieuNhap);
         // Set the fetched objects to the ChiTietPhieuNhap instance
         chiTiet.setPhieuNhap(phieuNhap);
         chiTiet.setNguyenLieu(nguyenLieu);

         // Update the ChiTietPhieuNhap in the database
         ChiTietPhieuNhap updated = repository.save(chiTiet);
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
      ChiTietPhieuNhap ct = chiTietPhieuNhapService.getById(id);
      return ct != null ? ResponseEntity.ok(ct)
                        : ResponseEntity.badRequest().body("Không tìm thấy chi tiết phiếu nhập với ID: " + id);
   }

   // Thêm chi tiết phiếu nhập mới (có thể dùng để thêm độc lập)
   @PostMapping
   public ResponseEntity<?> create(@RequestBody ChiTietPhieuNhap chiTietPhieuNhap) {
      try {
         return ResponseEntity.ok(chiTietPhieuNhapService.save(chiTietPhieuNhap));
      } catch (Exception e) {
         return ResponseEntity.badRequest().body("Lỗi khi thêm chi tiết phiếu nhập: " + e.getMessage());
      }
   }

   // Cập nhật chi tiết phiếu nhập
   @PutMapping("/{id}")
   public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody ChiTietPhieuNhap updated) {
      try {
         ChiTietPhieuNhap result = chiTietPhieuNhapService.update(id, updated);
         return ResponseEntity.ok(result);
      } catch (Exception e) {
         return ResponseEntity.badRequest().body("Lỗi khi cập nhật: " + e.getMessage());
      }
   }

   // Xóa chi tiết phiếu nhập
   @DeleteMapping("/{id}")
   public ResponseEntity<?> delete(@PathVariable Integer id) {
      try {
         chiTietPhieuNhapService.deleteById(id);
         return ResponseEntity.ok("Xóa thành công!");
      } catch (Exception e) {
         return ResponseEntity.badRequest().body("Lỗi khi xóa: " + e.getMessage());
      }
   }
}