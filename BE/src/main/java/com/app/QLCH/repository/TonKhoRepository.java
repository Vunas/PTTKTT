package com.app.QLCH.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.QLCH.model.TonKho;
import com.app.QLCH.model.KhoHang;
import com.app.QLCH.model.SanPham;

@Repository
public interface TonKhoRepository extends JpaRepository<TonKho, Integer> {
    
    // Tìm danh sách tồn kho theo kho hàng
    List<TonKho> findByKhoHang(KhoHang khoHang);

    // Tìm danh sách tồn kho theo sản phẩm
    List<TonKho> findBySanPham(SanPham sanPham);

    // Tìm tồn kho theo kho hàng và sản phẩm (nếu chỉ một sản phẩm trong một kho)
    TonKho findByKhoHangAndSanPham(KhoHang khoHang, SanPham sanPham);

    // Tìm danh sách tồn kho theo số lượng lớn hơn một giá trị
    List<TonKho> findBySoLuongGreaterThan(Integer soLuong);

    // Tìm danh sách tồn kho theo số lượng nhỏ hơn một giá trị
    List<TonKho> findBySoLuongLessThan(Integer soLuong);

    // Kiểm tra tồn tại của tồn kho theo kho hàng và sản phẩm
    boolean existsByKhoHangAndSanPham(KhoHang khoHang, SanPham sanPham);
}