package com.app.QLCH.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.QLCH.model.ChiTietCheBien;

@Repository
public interface ChiTietCheBienRepository extends JpaRepository<ChiTietCheBien, Integer> {
    // Tìm các chi tiết chế biến theo mã chế biến
    List<ChiTietCheBien> findByCheBienMaCheBien(Integer maCheBien);

    // Tìm các chi tiết chế biến theo sản phẩm
    List<ChiTietCheBien> findBySanPhamMaSanPham(Integer maSanPham);

    // Lấy danh sách các chi tiết chế biến chưa bị xoá mềm (trangThai = 1)
    @Query("SELECT ct FROM ChiTietCheBien ct WHERE ct.trangThai = 1")
    List<ChiTietCheBien> findAllActive();

    // Cập nhật trạng thái để xóa mềm thay vì xoá cứng
    @Query("UPDATE ChiTietCheBien ct SET ct.trangThai = 0 WHERE ct.maChiTiet = :maChiTiet")
    void softDelete(Integer maChiTiet);
}