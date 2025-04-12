package com.app.QLCH.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.QLCH.model.HoaDon;

@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon, Integer> {

    // Tìm hóa đơn theo trạng thái
    List<HoaDon> findByTrangThai(Integer trangThai);

    // Kiểm tra hóa đơn dựa trên mã đơn hàng
    Boolean existsByMaDonHang(Integer maDonHang);

    // Tìm hóa đơn theo mã nhân viên
    List<HoaDon> findByMaNhanVien(Integer maNhanVien);

    // Tìm hóa đơn theo nhiều điều kiện kết hợp, bao gồm mã nhân viên
    @Query("SELECT h FROM HoaDon h WHERE " +
            "(:ngayBatDau IS NULL OR h.ngayXuatHoaDon >= :ngayBatDau) AND " +
            "(:ngayKetThuc IS NULL OR h.ngayXuatHoaDon <= :ngayKetThuc) AND " +
            "(:tongTienMin IS NULL OR h.tongTien >= :tongTienMin) AND " +
            "(:tongTienMax IS NULL OR h.tongTien <= :tongTienMax) AND " +
            "(:maKhuyenMai IS NULL OR h.maKhuyenMai = :maKhuyenMai) AND " +
            "(:maNhanVien IS NULL OR h.maNhanVien = :maNhanVien)")
    List<HoaDon> filterHoaDon(
            @Param("ngayBatDau") java.util.Date ngayBatDau,
            @Param("ngayKetThuc") java.util.Date ngayKetThuc,
            @Param("tongTienMin") Double tongTienMin,
            @Param("tongTienMax") Double tongTienMax,
            @Param("maKhuyenMai") Integer maKhuyenMai,
            @Param("maNhanVien") Integer maNhanVien);
}