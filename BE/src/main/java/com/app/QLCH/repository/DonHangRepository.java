package com.app.QLCH.repository;

import java.util.List;
import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.QLCH.model.DonHang;

@Repository
public interface DonHangRepository extends JpaRepository<DonHang, Integer> {

    // Tìm tất cả đơn hàng với trạng thái khác trạng thái được chỉ định
    List<DonHang> findByTrangThai(Integer trangThai);

    // Tìm đơn hàng theo khoảng ngày, trạng thái, địa chỉ giao hàng, phương thức thanh toán và tổng giá
    List<DonHang> findByNgayDatBetweenAndTrangThaiGiaoHangContainingIgnoreCaseAndDiaChiGiaoHangContainingIgnoreCaseAndPhuongThucThanhToanContainingIgnoreCaseAndTongGiaBetweenAndTrangThai(
        Date startDate, Date endDate, String trangThaiGiaoHang, String diaChiGiaoHang, String phuongThucThanhToan, Double minTongGia, Double maxTongGia, Integer trangThai);

    // Tìm đơn hàng theo khoảng ngày, trạng thái, địa chỉ giao hàng, phương thức thanh toán và tổng giá
    List<DonHang> findByMaKhachHangAndNgayDatBetweenAndTrangThaiGiaoHangContainingIgnoreCaseAndDiaChiGiaoHangContainingIgnoreCaseAndPhuongThucThanhToanContainingIgnoreCaseAndTongGiaBetweenAndTrangThai(
        Integer maKhachHang, Date startDate, Date endDate, String trangThaiGiaoHang, String diaChiGiaoHang, String phuongThucThanhToan, Double minTongGia, Double maxTongGia, Integer trangThai);
}
