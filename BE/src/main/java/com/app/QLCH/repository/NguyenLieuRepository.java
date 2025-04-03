package com.app.QLCH.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.QLCH.model.NguyenLieu;

@Repository
public interface NguyenLieuRepository extends JpaRepository<NguyenLieu, Integer> {
    List<NguyenLieu> findByTenContainingIgnoreCaseAndDonViContainingIgnoreCaseAndGiaNhapBetweenAndSoLuongBetween(
            String ten, String donVi, Double giaNhapMin, Double giaNhapMax, Integer soLuongMin, Integer soLuongMax);

    // Kiểm tra xem một nguyên liệu đã tồn tại với tên cụ thể
    boolean existsByTen(String ten);

    @Query("SELECT n.hinhAnh FROM NguyenLieu n")
    List<String> findAllImagePaths();

}
