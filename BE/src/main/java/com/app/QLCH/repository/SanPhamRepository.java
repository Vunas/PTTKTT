package com.app.QLCH.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.QLCH.model.SanPham;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, Integer> {
    List<SanPham> findByTenSanPhamContainingIgnoreCaseAndGiaBanBetweenAndSoLuongBetween(
            String tenSanPham, Double giaBanMin, Double giaBanMax, Integer soLuongMin, Integer soLuongMax);

    // Kiểm tra xem một sản phẩm đã tồn tại với tên cụ thể
    boolean existsByTenSanPham(String tenSanPham);

    @Query("SELECT s.hinhAnh FROM SanPham s")
    List<String> findAllImagePaths();
}
