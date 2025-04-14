package com.app.QLCH.repository;

import com.app.QLCH.model.ChiTietPhieuNhap;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChiTietPhieuNhapRepository extends JpaRepository<ChiTietPhieuNhap, Integer> {
   List<ChiTietPhieuNhap> findByPhieuNhap_Id(Long maPhieuNhap);
   void deleteByPhieuNhapId(Integer phieuNhapId);
}