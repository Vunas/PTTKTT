package com.app.QLCH.controller;

import com.app.QLCH.model.ChiTietPhieuNhap;
import com.app.QLCH.model.PhieuNhap;
import com.app.QLCH.service.ChiTietPhieuNhapService;
import com.app.QLCH.service.PhieuNhapService;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/phieu-nhap")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@RequiredArgsConstructor
public class PhieuNhapController {

   private final PhieuNhapService phieuNhapService;
   private final ChiTietPhieuNhapService chiTietPhieuNhapService;

    // Lấy danh sách tất cả phiếu nhập
   @GetMapping
   public ResponseEntity<List<PhieuNhap>> getAllPhieuNhap() {
      return ResponseEntity.ok(phieuNhapService.getAllPhieuNhap());
   }

   // Lấy phiếu nhập theo ID
   @GetMapping("/{id}")
   public ResponseEntity<PhieuNhap> getPhieuNhapById(@PathVariable Long id) {
      return ResponseEntity.ok(phieuNhapService.getPhieuNhapById(id));
   }

   // Thêm mới phiếu nhập và chi tiết đi kèm
   @PostMapping
   public ResponseEntity<PhieuNhap> createPhieuNhap(@RequestBody PhieuNhap phieuNhap) {
      PhieuNhap created = phieuNhapService.createPhieuNhap(phieuNhap);
      return ResponseEntity.ok(created);
   }

   // Thêm chi tiết phiếu nhập vào phiếu đã có
   @PostMapping("/{id}/chi-tiet")
   public ResponseEntity<ChiTietPhieuNhap> addChiTietToPhieuNhap(
         @PathVariable Long id,
         @RequestBody ChiTietPhieuNhap chiTiet) {
      ChiTietPhieuNhap result = phieuNhapService.addChiTietToPhieuNhap(id, chiTiet);
      return ResponseEntity.ok(result);
   }

   // Lấy danh sách chi tiết theo mã phiếu nhập
   @GetMapping("/{id}/chi-tiet")
   public ResponseEntity<List<ChiTietPhieuNhap>> getChiTietPhieu(@PathVariable Long id) {
      return ResponseEntity.ok(chiTietPhieuNhapService.layChiTietTheoPhieu(id));
   }

   // Cập nhật phiếu nhập
   @PutMapping("/{id}")
   public ResponseEntity<PhieuNhap> updatePhieuNhap(@PathVariable Long id, @RequestBody PhieuNhap phieuNhap) {
      PhieuNhap existingPhieuNhap = phieuNhapService.getPhieuNhapById(id);
      
      if (existingPhieuNhap == null) {
         return ResponseEntity.badRequest().body(null);
      }

      // Cập nhật các thông tin của phiếu nhập
      existingPhieuNhap.setTenPhieu(phieuNhap.getTenPhieu());
      existingPhieuNhap.setFileChungTu(phieuNhap.getFileChungTu());
      existingPhieuNhap.setGhiChu(phieuNhap.getGhiChu());
      existingPhieuNhap.setNhaCungCap(phieuNhap.getNhaCungCap());
      existingPhieuNhap.setTrangThai(phieuNhap.getTrangThai());
      existingPhieuNhap.setNguoiNhap(phieuNhap.getNguoiNhap());
      existingPhieuNhap.setThoiGianCapNhat(phieuNhap.getThoiGianCapNhat());
      
      // Lưu lại phiếu nhập đã cập nhật
      PhieuNhap updatedPhieuNhap = phieuNhapService.updatePhieuNhap(existingPhieuNhap);
      return ResponseEntity.ok(updatedPhieuNhap);
   }

   
   // Cập nhật trạng thái phiếu nhập: đặt hàng, nhập kho, hủy
   @PutMapping("/{id}/trang-thai")
      public ResponseEntity<?> capNhatTrangThai(
      @PathVariable Long id,
      @RequestParam String trangThai,
      @RequestParam(required = true) Long nguoiNhapId,
      @RequestParam(required = false) Integer nguoiHuyId) {
      try {
      // Kiểm tra xem phiếu nhập có tồn tại không
      PhieuNhap phieuNhap = phieuNhapService.getPhieuNhapById(id);
      if (phieuNhap == null) {
         return ResponseEntity.badRequest().body("Không tìm thấy phiếu nhập với ID: " + id);
      }

      phieuNhapService.capNhatTrangThai(id, trangThai, nguoiHuyId);
      System.out.println("Test123: " + id);

      return ResponseEntity.ok("Cập nhật trạng thái thành công!");
   } 
   catch (Exception e) {
      return ResponseEntity.badRequest().body("Lỗi khi cập nhật trạng thái: " + e.getMessage());
   }
}
}