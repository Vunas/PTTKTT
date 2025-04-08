package com.app.QLCH.repository;

import java.util.List;
import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.QLCH.model.DonHang;

@Repository
public interface DonHangRepository extends JpaRepository<DonHang, Integer> {

    // Tìm tất cả đơn hàng với trạng thái khác trạng thái được chỉ định
    List<DonHang> findByTrangThaiNot(String trangThai);

    // Tìm đơn hàng theo khoảng ngày, trạng thái, địa chỉ giao hàng, phương thức thanh toán và tổng giá
    List<DonHang> findByNgayDatBetweenAndTrangThaiAndDiaChiGiaoHangContainingIgnoreCaseAndPhuongThucThanhToanContainingIgnoreCaseAndTongGiaBetween(
        Date startDate, Date endDate, String trangThai, String diaChiGiaoHang, String phuongThucThanhToan, Double minTongGia, Double maxTongGia);

    List<DonHang> findByNgayDatBetweenAndTrangThaiNotAndDiaChiGiaoHangContainingIgnoreCaseAndPhuongThucThanhToanContainingIgnoreCaseAndTongGiaBetween(
        Date startDate, Date endDate, String trangThaiNot, String diaChiGiaoHang, String phuongThucThanhToan, Double minTongGia, Double maxTongGia);

    // Tìm đơn hàng của khách hàng cụ thể theo khoảng ngày, trạng thái, địa chỉ giao hàng, phương thức thanh toán và tổng giá
    List<DonHang> findByMaKhachHangAndNgayDatBetweenAndTrangThaiContainingIgnoreCaseAndDiaChiGiaoHangContainingIgnoreCaseAndPhuongThucThanhToanContainingIgnoreCaseAndTongGiaBetween(
        Integer maKhachHang, Date startDate, Date endDate, String trangThai, String diaChiGiaoHang, String phuongThucThanhToan, Double minTongGia, Double maxTongGia);

    List<DonHang> findByMaKhachHangAndNgayDatBetweenAndTrangThaiNotAndDiaChiGiaoHangContainingIgnoreCaseAndPhuongThucThanhToanContainingIgnoreCaseAndTongGiaBetween(
        Integer maKhachHang, Date startDate, Date endDate, String trangThaiNot, String diaChiGiaoHang, String phuongThucThanhToan, Double minTongGia, Double maxTongGia);
}
