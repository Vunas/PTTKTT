package com.app.QLCH.controller;

import com.app.QLCH.model.ChiTietPhieuXuat;
import com.app.QLCH.model.PhieuNhap;
import com.app.QLCH.model.PhieuXuat;
import com.app.QLCH.service.ChiTietPhieuXuatService;
import com.app.QLCH.service.PhieuXuatService;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/phieu-xuat")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@RequiredArgsConstructor
public class PhieuXuatController {

   private final PhieuXuatService phieuXuatService;
   private final ChiTietPhieuXuatService chiTietPhieuXuatService;

    // Lấy danh sách tất cả phiếu nhập
   @GetMapping
   public ResponseEntity<List<PhieuXuat>> getAllPhieuXuat() {
      return ResponseEntity.ok(phieuXuatService.getAllPhieuXuat());
   }

   // Lấy phiếu nhập theo ID
   @GetMapping("/{id}")
   public ResponseEntity<PhieuXuat> getPhieuXuatById(@PathVariable Long id) {
      return ResponseEntity.ok(phieuXuatService.getPhieuXuatById(id));
   }

   // Thêm mới phiếu nhập và chi tiết đi kèm
   @PostMapping
   public ResponseEntity<PhieuXuat> createPhieuXuat(@RequestBody PhieuXuat phieuXuat) {
      PhieuXuat created = phieuXuatService.createPhieuXuat(phieuXuat);
      return ResponseEntity.ok(created);
   }

   // Thêm chi tiết phiếu nhập vào phiếu đã có
   @PostMapping("/{id}/chi-tiet")
   public ResponseEntity<ChiTietPhieuXuat> addChiTietToPhieuXuat(
         @PathVariable Long id,
         @RequestBody ChiTietPhieuXuat chiTiet) {
      ChiTietPhieuXuat result = phieuXuatService.addChiTietToPhieuXuat(id, chiTiet);
      return ResponseEntity.ok(result);
   }

   // Lấy danh sách chi tiết theo mã phiếu nhập
   @GetMapping("/{id}/chi-tiet")
   public ResponseEntity<List<ChiTietPhieuXuat>> getChiTietPhieu(@PathVariable Long id) {
      return ResponseEntity.ok(chiTietPhieuXuatService.layChiTietTheoPhieu(id));
   }

   // Cập nhật phiếu nhập
   @PutMapping("/{id}")
   public ResponseEntity<PhieuXuat> updatePhieuXuat(@PathVariable Long id, @RequestBody PhieuXuat phieuXuat) {
      PhieuXuat existingPhieuXuat = phieuXuatService.getPhieuXuatById(id);
      
      if (existingPhieuXuat == null) {
         return ResponseEntity.badRequest().body(null);
      }

      // Cập nhật các thông tin của phiếu nhập
      existingPhieuXuat.setTenPhieu(phieuXuat.getTenPhieu());
      existingPhieuXuat.setFileChungTu(phieuXuat.getFileChungTu());
      existingPhieuXuat.setGhiChu(phieuXuat.getGhiChu());
      existingPhieuXuat.setNguoiXuat(phieuXuat.getNguoiXuat());
      
      // Lưu lại phiếu nhập đã cập nhật
      PhieuXuat updatedPhieuXuat = phieuXuatService.updatePhieuXuat(existingPhieuXuat);
      return ResponseEntity.ok(updatedPhieuXuat);
   }

   @PutMapping("/xuat-kho/{id}")
   public void xuatKho(@PathVariable Long id) {
      phieuXuatService.capNhatKhoNguyenLieu(id);
   }
   
}