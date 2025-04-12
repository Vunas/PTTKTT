package com.app.QLCH.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.QLCH.model.KhuyenMai;

@Repository
public interface KhuyenMaiRepository extends JpaRepository<KhuyenMai, Integer> {
    // Tìm các khuyến mãi không còn hoạt động
    List<KhuyenMai> findByTrangThaiNot(Integer trangThai);

    // Kiểm tra xem khuyến mãi có tồn tại dựa trên tên khuyến mãi
    Boolean existsByTenKhuyenMai(String tenKhuyenMai);

    @Query("SELECT k FROM KhuyenMai k WHERE " +
    "(:tenKhuyenMai IS NULL OR LOWER(k.tenKhuyenMai) LIKE LOWER(CONCAT('%', :tenKhuyenMai, '%'))) AND " +
    "(:loaiKhuyenMai IS NULL OR k.loaiKhuyenMai = :loaiKhuyenMai) AND " +
    "(:trangThai IS NULL OR k.trangThai = :trangThai) AND " +
    "(:ngayBatDau IS NULL OR k.ngayBatDau >= :ngayBatDau) AND " +
    "(:ngayKetThuc IS NULL OR k.ngayKetThuc <= :ngayKetThuc)")
List<KhuyenMai> filterKhuyenMaiByAllConditions(
     @Param("tenKhuyenMai") String tenKhuyenMai,
     @Param("loaiKhuyenMai") Integer loaiKhuyenMai,
     @Param("trangThai") Integer trangThai,
     @Param("ngayBatDau") java.sql.Date ngayBatDau,
     @Param("ngayKetThuc") java.sql.Date ngayKetThuc);
}
