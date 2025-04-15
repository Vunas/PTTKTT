package com.app.QLCH.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.app.QLCH.model.ChiTietPhieuXuat;
import com.app.QLCH.model.NguyenLieu;
import com.app.QLCH.model.PhieuXuat;
import com.app.QLCH.repository.ChiTietPhieuXuatRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChiTietPhieuXuatService {

   private final NguyenLieuService nguyenLieuService; // Add this line
   private final PhieuXuatService phieuXuatService;  
   private final ChiTietPhieuXuatRepository repository;

   // Lấy danh sách chi tiết theo phiếu nhập
   public List<ChiTietPhieuXuat> layChiTietTheoPhieu(Long maPhieuXuat) {
      return repository.findByPhieuXuat_Id(maPhieuXuat);
   }

   public List<ChiTietPhieuXuat> getAllChiTiet() {
      return repository.findAll();
   }

   // Lưu hoặc cập nhật chi tiết
   public ChiTietPhieuXuat save(ChiTietPhieuXuat chiTiet) {
      return repository.save(chiTiet);
   }

   
   // Cập nhật chi tiết
   public ChiTietPhieuXuat update(Integer id, ChiTietPhieuXuat updated) {
      System.out.println("Cập nhật chi tiết: " + updated);
      Optional<ChiTietPhieuXuat> existingOpt = repository.findById(id);
      if (existingOpt.isEmpty()) {
         throw new RuntimeException("Không tìm thấy chi tiết phiếu nhập với ID: " + id);
      }

      ChiTietPhieuXuat existing = existingOpt.get();
      existing.setSoLuong(updated.getSoLuong());
      NguyenLieu nguyenLieu = nguyenLieuService.getNguyenLieuById(updated.getNguyenLieu().getMaNguyenLieu());
      PhieuXuat phieuXuat = phieuXuatService.getPhieuXuatById(updated.getPhieuXuat().getId());
      
      existing.setNguyenLieu(nguyenLieu);
      existing.setPhieuXuat(phieuXuat);

      return repository.save(existing);
   }
   public List<ChiTietPhieuXuat> updateList(List<ChiTietPhieuXuat> list) {
      List<ChiTietPhieuXuat> result = new ArrayList<>();
      for (ChiTietPhieuXuat item : list) {
         ChiTietPhieuXuat updated = update(item.getId(), item);
         result.add(updated);
      }
      return result;
   }

   // Xóa chi tiết
   public void deleteById(Integer id) {
      repository.deleteById(id);
   }

   // Lấy chi tiết theo ID
   public ChiTietPhieuXuat getById(Integer id) {
      return repository.findById(id).orElse(null);
   }
}
