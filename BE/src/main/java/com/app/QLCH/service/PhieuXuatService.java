package com.app.QLCH.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.app.QLCH.model.ChiTietPhieuXuat;
import com.app.QLCH.model.NguyenLieu;
import com.app.QLCH.model.PhieuXuat;
import com.app.QLCH.repository.ChiTietPhieuXuatRepository;
import com.app.QLCH.repository.NguyenLieuRepository;
import com.app.QLCH.repository.PhieuXuatRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PhieuXuatService {

   private final PhieuXuatRepository phieuXuatRepo;
   private final ChiTietPhieuXuatRepository chiTietRepo;
   private final NguyenLieuRepository nguyenLieuRepo;

   // Lấy tất cả phiếu nhập
   public List<PhieuXuat> getAllPhieuXuat() {
      return phieuXuatRepo.findAll();
   }

   // Lấy phiếu nhập theo ID
   public PhieuXuat getPhieuXuatById(Long id) {
      return phieuXuatRepo.findById(id)
               .orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu nhập với ID: " + id));
   }

   // Lấy danh sách chi tiết theo mã phiếu nhập
   
   // Tạo mới phiếu nhập
   @Transactional
   public PhieuXuat createPhieuXuat(PhieuXuat phieuXuat) {
   if (phieuXuat.getMaPhieu() == null || phieuXuat.getMaPhieu().isEmpty()) {
      String maTuSinh = "PX-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
      phieuXuat.setMaPhieu(maTuSinh);
   }

   PhieuXuat savedPhieu = phieuXuatRepo.save(phieuXuat);
   
   for (ChiTietPhieuXuat ct : phieuXuat.getChiTiet()) {
      ct.setPhieuXuat(savedPhieu);
      chiTietRepo.save(ct);
   }
   System.out.println("-----------------------------------------------------");
   System.out.println("ID: " + savedPhieu.getId());
   capNhatKhoNguyenLieu(savedPhieu.getId());
   return savedPhieu;
}

   // Thêm chi tiết phiếu nhập
   @Transactional
   public ChiTietPhieuXuat addChiTietToPhieuXuat(Long idPhieuXuat, ChiTietPhieuXuat chiTiet) {
      PhieuXuat phieu = getPhieuXuatById(idPhieuXuat);
      chiTiet.setPhieuXuat(phieu);
      return chiTietRepo.save(chiTiet);

   }

   public PhieuXuat updatePhieuXuat(PhieuXuat phieuXuat) {
      // Lưu lại phiếu nhập đã cập nhật
      return phieuXuatRepo.save(phieuXuat);
   }

   @Transactional
   public void capNhatKhoNguyenLieu(Long phieuXuatId) {
      PhieuXuat phieu = phieuXuatRepo.findById(phieuXuatId)
      .orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu xuất"));
      System.out.println("************************************************");
      System.out.println(phieu.getId());

      for (ChiTietPhieuXuat ct : phieu.getChiTiet()) {
         NguyenLieu nl = ct.getNguyenLieu();
         int slTon = nl.getSoLuong();
         int slXuat = ct.getSoLuong();

         System.out.println("Đang tạo phiếu xuất với mã: " + phieu.getId());
         System.out.println("Đang lưu chi tiết phiếu xuất: " + ct);

         if (slXuat > slTon) {
            throw new RuntimeException("Nguyên liệu \"" + nl.getTen() + "\" không đủ tồn kho!");
         }

         nl.setSoLuong(slTon - slXuat);
         nguyenLieuRepo.save(nl);
      }
   }

}
