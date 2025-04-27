package com.app.QLCH.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.app.QLCH.model.ChiTietPhieuNhap;
import com.app.QLCH.model.NguyenLieu;
import com.app.QLCH.model.PhieuNhap;
import com.app.QLCH.model.TonKho;
import com.app.QLCH.repository.ChiTietPhieuNhapRepository;
import com.app.QLCH.repository.TonKhoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChiTietPhieuNhapService {

   private final NguyenLieuService nguyenLieuService; // Add this line
   private final PhieuNhapService phieuNhapService;

   private final ChiTietPhieuNhapRepository repository;
   private final TonKhoRepository tonKhoRepo;

   // Lấy danh sách chi tiết theo phiếu nhập
   public List<ChiTietPhieuNhap> layChiTietTheoPhieu(Long maPhieuNhap) {
      return repository.findByPhieuNhap_Id(maPhieuNhap);
   }

   public List<ChiTietPhieuNhap> getAllChiTiet() {
      return repository.findAll();
   }

   // Lưu hoặc cập nhật chi tiết
   public ChiTietPhieuNhap save(ChiTietPhieuNhap chiTiet) {
      TonKho tonKho = tonKhoRepo.findByKhoHangAndNguyenLieu(chiTiet.getPhieuNhap().getKhoHang(),
            chiTiet.getNguyenLieu());

      if (tonKho != null) {
         tonKho.setSoLuong(tonKho.getSoLuong() + chiTiet.getSoLuong());
         tonKhoRepo.save(tonKho);
      } else {
         TonKho newTonKho = new TonKho();
         newTonKho.setKhoHang(chiTiet.getPhieuNhap().getKhoHang());
         newTonKho.setNguyenLieu(chiTiet.getNguyenLieu());
         newTonKho.setSoLuong(chiTiet.getSoLuong());
         tonKhoRepo.save(newTonKho);
      }

      return repository.save(chiTiet);
   }

   // Cập nhật chi tiết
   public ChiTietPhieuNhap update(Integer id, ChiTietPhieuNhap updated) {
      System.out.println("Cập nhật chi tiết: " + updated);
      Optional<ChiTietPhieuNhap> existingOpt = repository.findById(id);
      if (existingOpt.isEmpty()) {
         throw new RuntimeException("Không tìm thấy chi tiết phiếu nhập với ID: " + id);
      }

      ChiTietPhieuNhap existing = existingOpt.get();
      existing.setSoLuong(updated.getSoLuong());
      existing.setGiaNhap(updated.getGiaNhap());
      NguyenLieu nguyenLieu = nguyenLieuService.getNguyenLieuById(updated.getNguyenLieu().getMaNguyenLieu());
      PhieuNhap phieuNhap = phieuNhapService.getPhieuNhapById(updated.getPhieuNhap().getId());

      existing.setNguyenLieu(nguyenLieu);
      existing.setPhieuNhap(phieuNhap);

      return repository.save(existing);
   }

   public List<ChiTietPhieuNhap> updateList(List<ChiTietPhieuNhap> list) {
      List<ChiTietPhieuNhap> result = new ArrayList<>();
      for (ChiTietPhieuNhap item : list) {
         ChiTietPhieuNhap updated = update(item.getId(), item);
         result.add(updated);
      }
      return result;
   }

   // Xóa chi tiết
   public void deleteById(Integer id) {
      repository.deleteById(id);
   }

   // Lấy chi tiết theo ID
   public ChiTietPhieuNhap getById(Integer id) {
      return repository.findById(id).orElse(null);
   }
}
