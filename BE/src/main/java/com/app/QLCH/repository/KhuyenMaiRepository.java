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

    // Tìm kiếm khuyến mãi theo tên khuyến mãi
    List<KhuyenMai> findByTenKhuyenMaiContainingIgnoreCase(String tenKhuyenMai);

    // Tìm kiếm khuyến mãi theo loại khuyến mãi (1: phần trăm giảm, 2: giá cố định
    // giảm, 3: quà tặng)
    List<KhuyenMai> findByLoaiKhuyenMai(Integer loaiKhuyenMai);

    // Tìm kiếm khuyến mãi theo khoảng thời gian
    List<KhuyenMai> findByNgayBatDauGreaterThanEqualAndNgayKetThucLessThanEqual(java.sql.Date ngayBatDau,
            java.sql.Date ngayKetThuc);

    // Kiểm tra xem khuyến mãi có tồn tại dựa trên tên khuyến mãi
    Boolean existsByTenKhuyenMai(String tenKhuyenMai);

    // Tìm kiếm khuyến mãi theo trạng thái và loại khuyến mãi
    List<KhuyenMai> findByTrangThaiAndLoaiKhuyenMai(Integer trangThai, Integer loaiKhuyenMai);

    // Tìm kiếm khuyến mãi theo tên khuyến mãi và trạng thái
    List<KhuyenMai> findByTenKhuyenMaiContainingIgnoreCaseAndTrangThai(String tenKhuyenMai, Integer trangThai);

    // Tìm khuyến mãi theo tên và loại khuyến mãi
    List<KhuyenMai> findByTenKhuyenMaiContainingIgnoreCaseAndLoaiKhuyenMai(String tenKhuyenMai, Integer loaiKhuyenMai);

    // Tìm khuyến mãi theo tên, loại khuyến mãi và trạng thái
    List<KhuyenMai> findByTenKhuyenMaiContainingIgnoreCaseAndLoaiKhuyenMaiAndTrangThai(String tenKhuyenMai,
            Integer loaiKhuyenMai, Integer trangThai);

    @Query("SELECT k FROM KhuyenMai k WHERE " +
            "(:tenKhuyenMai IS NULL OR LOWER(k.tenKhuyenMai) LIKE LOWER(CONCAT('%', :tenKhuyenMai, '%'))) AND " +
            "(:loaiKhuyenMai IS NULL OR k.loaiKhuyenMai = :loaiKhuyenMai) AND " +
            "(:trangThai IS NULL OR k.trangThai = :trangThai) AND " +
            "(k.ngayBatDau >= :ngayBatDau AND k.ngayKetThuc <= :ngayKetThuc)")
    List<KhuyenMai> filterKhuyenMaiByAllConditions(
            @Param("tenKhuyenMai") String tenKhuyenMai,
            @Param("loaiKhuyenMai") Integer loaiKhuyenMai,
            @Param("trangThai") Integer trangThai,
            @Param("ngayBatDau") java.sql.Date ngayBatDau,
            @Param("ngayKetThuc") java.sql.Date ngayKetThuc);
}
