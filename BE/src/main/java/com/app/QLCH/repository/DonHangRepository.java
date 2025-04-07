package com.app.QLCH.repository;

import java.util.List;
import java.sql.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.QLCH.model.DonHang;

@Repository
public interface DonHangRepository extends JpaRepository<DonHang, Integer> {
    // Lấy danh sách đơn hàng không bị xóa (trangThai != 0)
    List<DonHang> findByTrangThaiNot(Integer trangThai);

    // Lấy danh sách đơn hàng theo trạng thái (không bị xóa)
    List<DonHang> findByTrangThaiAndTrangThaiNot(Integer trangThai, Integer excludeTrangThai);

    // // Lấy danh sách đơn hàng theo mã khách hàng (không bị xóa)
    // List<DonHang> findByKhachHang_MaKhachHangAndTrangThaiNot(Integer maKhachHang,
    // Integer excludeTrangThai);

    // Lấy danh sách đơn hàng theo ngày đặt (không bị xóa)
    List<DonHang> findByNgayDatAndTrangThaiNot(Date ngayDat, Integer excludeTrangThai);

    List<DonHang> findByNgayDatBetweenAndTongGiaBetweenAndTrangThaiNot(
            Date startDate, Date endDate, Double minGia, Double maxGia,
            Integer excludeTrangThai);

    List<DonHang> findByNgayDatBetweenAndTongGiaBetweenAndTrangThai(
            Date startDate, Date endDate, Double minGia, Double maxGia,
            Integer TrangThai);

    List<DonHang> findByMaKhachHangAndNgayDatBetweenAndTongGiaBetweenAndTrangThaiNot(
            Integer maKhachHang, Date startDate, Date endDate, Double minGia, Double maxGia,
            Integer excludeTrangThai);

    List<DonHang> findByMaKhachHangAndNgayDatBetweenAndTongGiaBetweenAndTrangThai(
            Integer maKhachHang, Date startDate, Date endDate, Double minGia, Double maxGia,
            Integer TrangThai);

    List<DonHang> findByNgayDatBeforeAndTongGiaBetweenAndTrangThaiNot(Date endDate, Double minGia, Double maxGia,
            Integer excludeTrangThai);

    List<DonHang> findByNgayDatAfterAndTongGiaBetweenAndTrangThaiNot(Date startDate, Double minGia, Double maxGia,
            Integer excludeTrangThai);

    List<DonHang> findByNgayDatBeforeAndTongGiaBetweenAndTrangThai(Date endDate, Double minGia, Double maxGia,
            Integer trangThai);

    List<DonHang> findByNgayDatAfterAndTongGiaBetweenAndTrangThai(Date startDate, Double minGia, Double maxGia,
            Integer trangThai);

    List<DonHang> findByMaKhachHangAndNgayDatBeforeAndTongGiaBetweenAndTrangThaiNot(Integer maKhachHang, Date endDate,
            Double minGia, Double maxGia, Integer excludeTrangThai);

    List<DonHang> findByMaKhachHangAndNgayDatAfterAndTongGiaBetweenAndTrangThaiNot(Integer maKhachHang, Date startDate,
            Double minGia, Double maxGia, Integer excludeTrangThai);

    List<DonHang> findByMaKhachHangAndNgayDatBeforeAndTongGiaBetweenAndTrangThai(Integer maKhachHang, Date endDate,
            Double minGia, Double maxGia, Integer trangThai);

    List<DonHang> findByMaKhachHangAndNgayDatAfterAndTongGiaBetweenAndTrangThai(Integer maKhachHang, Date startDate,
            Double minGia, Double maxGia, Integer trangThai);

    // Lọc theo khoảng giá và trạng thái (không bị xóa)
    List<DonHang> findByTongGiaBetweenAndTrangThaiNot(Double minGia, Double maxGia, Integer excludeTrangThai);

    // Lọc theo khoảng giá và trạng thái cụ thể
    List<DonHang> findByTongGiaBetweenAndTrangThai(Double minGia, Double maxGia, Integer trangThai);

    // Lọc theo mã khách hàng, khoảng giá và trạng thái (không bị xóa)
    List<DonHang> findByMaKhachHangAndTongGiaBetweenAndTrangThaiNot(Integer maKhachHang, Double minGia, Double maxGia,
            Integer excludeTrangThai);

    // Lọc theo mã khách hàng, khoảng giá và trạng thái cụ thể
    List<DonHang> findByMaKhachHangAndTongGiaBetweenAndTrangThai(Integer maKhachHang, Double minGia, Double maxGia,
            Integer trangThai);
}
