package com.app.QLCH.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.app.QLCH.model.ChiTietPhieuNhap;
import com.app.QLCH.model.NhanVien;
import com.app.QLCH.model.PhieuNhap;
import com.app.QLCH.repository.ChiTietPhieuNhapRepository;
import com.app.QLCH.repository.NhanVienRepository;
import com.app.QLCH.repository.PhieuNhapRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PhieuNhapService {

   private final PhieuNhapRepository phieuNhapRepo;
   private final ChiTietPhieuNhapRepository chiTietRepo;
   private final NhanVienRepository nhanVienRepo;

   // Lấy tất cả phiếu nhập
   public List<PhieuNhap> getAllPhieuNhap() {
      return phieuNhapRepo.findAll();
   }

   // Lấy phiếu nhập theo ID
   public PhieuNhap getPhieuNhapById(Long id) {
      return phieuNhapRepo.findById(id)
               .orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu nhập với ID: " + id));
   }

   // Lấy danh sách chi tiết theo mã phiếu nhập
   
   // Tạo mới phiếu nhập
   public PhieuNhap createPhieuNhap(PhieuNhap phieuNhap) {
      if (phieuNhap.getMaPhieu() == null || phieuNhap.getMaPhieu().isEmpty()) {
         // Tạo mã tự động
         String maTuSinh = "PN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
         phieuNhap.setMaPhieu(maTuSinh);
      }
      return phieuNhapRepo.save(phieuNhap);
   }

   // Thêm chi tiết phiếu nhập
   @Transactional
   public ChiTietPhieuNhap addChiTietToPhieuNhap(Long idPhieuNhap, ChiTietPhieuNhap chiTiet) {
      PhieuNhap phieu = getPhieuNhapById(idPhieuNhap);
      chiTiet.setPhieuNhap(phieu);
      return chiTietRepo.save(chiTiet);
   }

   public PhieuNhap updatePhieuNhap(PhieuNhap phieuNhap) {
      // Lưu lại phiếu nhập đã cập nhật
      return phieuNhapRepo.save(phieuNhap);
   }

   // Cập nhật trạng thái: DAT_HANG, NHAP_KHO, HUY
   @Transactional
   public void capNhatTrangThai(Long id, String trangThai, Integer nguoiHuyId) {
      PhieuNhap phieu = getPhieuNhapById(id);
      
      switch (trangThai.toUpperCase()) {
         case "DAT_HANG":
            phieu.setTrangThai(PhieuNhap.TrangThaiPhieuNhap.DAT_HANG);
            break;
      
         case "NHAP_KHO":
            phieu.setTrangThai(PhieuNhap.TrangThaiPhieuNhap.NHAP_KHO);
            break;
      
         case "HUY":
            phieu.setTrangThai(PhieuNhap.TrangThaiPhieuNhap.HUY);
            phieu.setThoiGianHuy(LocalDateTime.now());

            if (nguoiHuyId != null) {
               Optional<NhanVien> nv = nhanVienRepo.findById(nguoiHuyId);
               nv.ifPresent(phieu::setNguoiHuy); // Gán luôn entity
            }
            break;
      
         default:
            throw new IllegalArgumentException("Trạng thái không hợp lệ: " + trangThai);

      }

      phieuNhapRepo.save(phieu);
   }
}
