package com.app.QLCH.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.QLCH.model.ChiTietPhieuXuat;

public interface ChiTietPhieuXuatRepository extends JpaRepository<ChiTietPhieuXuat, Integer> {
   List<ChiTietPhieuXuat> findByPhieuXuat_Id(Long maPhieuXuat);
   void deleteByPhieuXuatId(Integer phieuXuatId);
}
