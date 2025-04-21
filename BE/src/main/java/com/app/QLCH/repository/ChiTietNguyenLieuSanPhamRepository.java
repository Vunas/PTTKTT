package com.app.QLCH.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.QLCH.model.ChiTietNguyenLieuSanPham;

@Repository
public interface ChiTietNguyenLieuSanPhamRepository extends JpaRepository<ChiTietNguyenLieuSanPham, Integer> {
    // Tìm các chi tiết nguyên liệu liên quan đến một sản phẩm cụ thể
    List<ChiTietNguyenLieuSanPham> findBySanPhamMaSanPham(Integer maSanPham);

    // Tìm các chi tiết nguyên liệu liên quan đến một nguyên liệu cụ thể
    List<ChiTietNguyenLieuSanPham> findByNguyenLieuMaNguyenLieu(Integer maNguyenLieu);

    // Kiểm tra xem một sản phẩm có sử dụng nguyên liệu cụ thể hay không
    boolean existsBySanPhamMaSanPhamAndNguyenLieuMaNguyenLieu(Integer maSanPham, Integer maNguyenLieu);

    @Query("SELECT c.soLuongNguyenLieu FROM ChiTietNguyenLieuSanPham c WHERE c.sanPham.maSanPham = :maSanPham AND c.nguyenLieu.maNguyenLieu = :maNguyenLieu")
    Double findRequiredQuantityForProductAndIngredient(Integer maSanPham, Integer maNguyenLieu);
}
