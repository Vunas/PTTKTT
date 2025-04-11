package com.app.QLCH.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.app.QLCH.model.ChiTietDonHang;

import java.util.List;

@Repository
public interface ChiTietDonHangRepository extends JpaRepository<ChiTietDonHang, Integer> {

    // Tìm tất cả chi tiết đơn hàng theo mã đơn hàng
    List<ChiTietDonHang> findByMaDonHangAndTrangThai(Integer maDonHang, Integer trangThai);

    List<ChiTietDonHang> findByMaDonHang(Integer maDonHang);

    // Tìm tất cả chi tiết đơn hàng theo mã sản phẩm
    List<ChiTietDonHang> findByMaSanPham(Integer maSanPham);

    // Tìm chi tiết đơn hàng theo trạng thái
    List<ChiTietDonHang> findByTrangThai(Integer trangThai);

    // Tìm chi tiết đơn hàng với đơn giá nằm trong khoảng
    List<ChiTietDonHang> findByDonGiaBetween(Double minDonGia, Double maxDonGia);

    // Tìm chi tiết đơn hàng với số lượng sản phẩm lớn hơn giá trị chỉ định
    List<ChiTietDonHang> findBySoLuongGreaterThan(Integer soLuong);
}