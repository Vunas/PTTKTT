package com.app.QLCH.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.app.QLCH.model.ChiTietPhieuNhap;
import com.app.QLCH.model.NguyenLieu;
import com.app.QLCH.model.NhanVien;
import com.app.QLCH.model.PhieuNhap;
import com.app.QLCH.repository.ChiTietPhieuNhapRepository;
import com.app.QLCH.repository.NguyenLieuRepository;
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
   private final NguyenLieuRepository nguyenLieuRepo;

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
   @Transactional
   public PhieuNhap createPhieuNhap(PhieuNhap phieuNhap) {

   if (phieuNhap.getMaPhieu() == null || phieuNhap.getMaPhieu().isEmpty()) {
      String maTuSinh = "PN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
      phieuNhap.setMaPhieu(maTuSinh);
   }

   if (phieuNhap.getTrangThai() == null) {
      phieuNhap.setTrangThai(PhieuNhap.TrangThaiPhieuNhap.DAT_HANG);  // Hoặc một trạng thái mặc định nếu chưa có
  }

   PhieuNhap savedPhieu = phieuNhapRepo.save(phieuNhap);

   System.out.println("Trạng thái: phieuNhap.getTrangThai()------------" + phieuNhap.getTrangThai());

   for (ChiTietPhieuNhap ct : phieuNhap.getChiTiet()) {
      ct.setPhieuNhap(savedPhieu);

      // Load NguyenLieu từ DB để đảm bảo là entity managed
      NguyenLieu nl = nguyenLieuRepo.findById(ct.getNguyenLieu().getMaNguyenLieu())
         .orElseThrow(() -> new RuntimeException("Không tìm thấy nguyên liệu"));
      ct.setNguyenLieu(nl);

      chiTietRepo.save(ct);
   }

   System.out.println("Trạng thái 2: savedPhieu.getTrangThai()------------" + savedPhieu.getTrangThai());

   // Flush để đảm bảo chi tiết đã được lưu trước khi gọi capNhatKho
   chiTietRepo.flush();
   phieuNhapRepo.flush();
   System.out.println("Trạng thái: phieuNhap.getTrangThai()------------" + phieuNhap.getTrangThai());

   // Gọi cập nhật kho nếu trạng thái là NHAP_KHO
   if (savedPhieu.getTrangThai() == PhieuNhap.TrangThaiPhieuNhap.NHAP_KHO) {
      // Load lại từ DB để chắc chắn đã có chi tiết
      PhieuNhap phieuDayDu = phieuNhapRepo.findById(savedPhieu.getId())
         .orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu nhập sau khi lưu"));
      capNhatKhoNguyenLieu(phieuDayDu.getId());
   }
   System.out.println("Trạng thái: phieuNhap.getTrangThai()------------" + phieuNhap.getTrangThai());

   return savedPhieu;
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

   @Transactional
      public void capNhatKhoNguyenLieu(Long phieuNhapId) {
         System.out.println("Cập nhật nguyên liệu: " + phieuNhapId);
         PhieuNhap phieu = phieuNhapRepo.findByIdWithChiTiet(phieuNhapId)
               .orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu nhập"));
         System.out.println("-------------------PHIEU:--------------------" + phieu.getChiTiet());

         for (ChiTietPhieuNhap ct : phieu.getChiTiet()) {
            NguyenLieu nl = ct.getNguyenLieu();
            System.out.println("Cập nhật nguyên liệu: " + nl.getMaNguyenLieu() + ", Số lượng cũ: " + nl.getSoLuong());
            nl.setSoLuong(nl.getSoLuong() + ct.getSoLuong());
            nguyenLieuRepo.save(nl);
            System.out.println("Cập nhật nguyên liệu: " + nl.getMaNguyenLieu() + ", Số lượng cũ: " + nl.getSoLuong());
         }
         nguyenLieuRepo.flush();
         System.out.println("Tổng số chi tiết trong phiếu: " + phieu.getChiTiet().size());
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
            capNhatKhoNguyenLieu(id);
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
